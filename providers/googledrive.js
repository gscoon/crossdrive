const fs            = require('fs');
const {google}      = require('googleapis');
const async         = require('async');
const Path          = require('path');
const OAuth2Client  = google.auth.OAuth2;

const util          = require('../util');

const PROVIDER_KEY  = 'googledrive';

var Client;
var Drive;
var Scopes = [];
var CachedPaths = {};

module.exports = {
    authorize       : authorize,
    completeAuth    : completeAuth,
    checkClient     : checkClient,
    createClient    : createClient,
    list            : listFiles,
    uploadFile      : createFile,
    createFolder    : createFolder,
}

function getFolderID(dirPath, doMakeDir){
    var key = keyify(dirPath);

    if(CachedPaths[key] && CachedPaths[key]['id'])
        return Promise.resolve(CachedPaths[key]['id']);

    return setAllFolderIDs(key, doMakeDir)
}

function keyify(dirPath){
    if(dirPath.charAt(0) !== '/')
        dirPath = '/' + dirPath;

    if(dirPath.slice(-1) === '/')
        dirPath = dirPath.slice(0,-1);

    return dirPath
}

// 1. loop through each folder
// 2. return folder ID for each level
// 3. If doesnt exist, pull from provider
// 4. If doesnt exist in provider, then create

function setAllFolderIDs(dirPath, makeDir){
    return new Promise((resolve, reject)=>{
        var breakDown = breakDownFolders(dirPath);
        if(!breakDown || !breakDown.length)
            return resolve(null);

        async.eachOfSeries(breakDown, (dir, index, next)=>{
            if(CachedPaths[dir] && CachedPaths[dir]['id'])
                return next();

            var parentID = null;

            if(index > 0)
                parentID = CachedPaths[breakDown[index - 1]]['id'];

            return pullOrCreate(dir, parentID, makeDir)
            .then((folderID)=>{
                next(!folderID);
            })
        }, ()=>{
            if(CachedPaths[dirPath])
                resolve(CachedPaths[dirPath]['id']);
            else
                resolve(null)
        })
    })
}

function pullOrCreate(dirPath, parentID, doCreate){
    var basename = Path.basename(dirPath);

    return doList(basename, parentID)
    .then((results)=>{
        if(results.data.length){
            var id = results.data[0]['id'];
            setCache(dirPath, id);
            return id;
        }
        // only do this in "write " situations
        if(!doCreate)
            return null;

        return createFolder(dirPath)
        .then((item)=>{
            return item.id;
        })
    })
}

function setCache(p, id){
    if(!id)
        return;

    CachedPaths[p] = {
        key         : p,
        basename    : Path.basename(p),
        id          : id,
    }
}

// turn path into array of paths
// "/aa/bb" => ["/aa", "/aa/bb"]
function breakDownFolders(p){
    var ret = [];
    var pSplit = p.split('/');
    pSplit.forEach((x, index)=>{
        var key = pSplit.slice(0,index+1).join('/');
        if(!key || key === '/') return;
        ret.push(key);
    })
    return ret;
}

function listFiles(dirPath){
    return getFolderID(dirPath)
    .then((folderID)=>{
        if(!folderID)
            return false;

        return doList(null, folderID);
    })
}

function doList(name, parentID){
    return new Promise((resolve, reject)=>{
        var queryObj = {};
        if(parentID){
            if(typeof parentID === 'object')
                parentID = parentID.id;

            queryObj[parentID] = ['in', 'parents'];
        }

        if(name)
            queryObj.name = name;

        Drive.files.list({q: transformQuery(queryObj)}, (err, response)=>{
            if(err)
                return reject(err);

            resolve({
                data : response.data.files.map(normalizeListings),
                next : response.data.nextPageToken,
            })
        })
    })

}

function createFile(filePath, type, body){
    var parentPath = Path.dirname(filePath);
    return getFolderID(parentPath, true)
    .then((parentID)=>{
        return doCreate({
            type        : type,
            name        : Path.basename(filePath),
            body        : body,
            folder      : parentID,
        })
    })
    .then((item)=>{
        setCache(filePath, item.id);
        return item;
    })
}

function createFolder(folderPath){
    return createFile(folderPath, 'folder');
}

function doCreate(options){
    return new Promise((resolve, reject)=>{
        var resource = {
            mimeType    : options.type,
            name        : options.name
        }

        if(['folder','directory'].indexOf(options.type) > -1)
            resource.mimeType = 'application/vnd.google-apps.folder';

        var media = {
            mimeType    : options.type,
        };

        if(options.body)
            media.body = options.body;

        if(options.folder)
            resource.parents = [options.folder]

        Drive.files.create({
            resource,
            media,
        }, function (err, results) {
            if (err)
                return reject(err);

            return resolve(normalizeListings(results.data))
        });
    })
}

function createClient(credentials, scopes){
    Client = new OAuth2Client(credentials.clientID, credentials.clientSecret, credentials.redirectURL);

    Drive = google.drive({version: 'v3', auth: Client});

    if(!Array.isArray(scopes))
        scopes = [scopes];

    Scopes = scopes;
}


function checkClient(){
    return !!Client;
}

function authorize() {
    return new Promise(function(resolve, reject){
        if(!Client)
            return reject('Bad client');

        util.getToken(PROVIDER_KEY)
        .then(function(tokenData){
            if(!tokenData)
                return handleNew();

            setToken(tokenData);
            return resolve({status: true})
        })
        .catch(handleNew);

        function handleNew(){
            var url = requestAuthURL();
            return resolve({status: false, authURL: url})
        }
    })
}

function setToken(token){
    Client.setCredentials(token);
}

function requestAuthURL(){
    const authUrl = Client.generateAuthUrl({
        access_type : 'offline',
        scope       : Scopes,
    });

    return authUrl;
}

// after user returns with code
function completeAuth(code){
    return new Promise((resolve, reject)=>{
        Client.getToken(code, (err, token) => {
            if(err)
                return reject(err);

            // store token
            util.updateToken(PROVIDER_KEY, token)
            .then(()=>{
                setToken(token);
                resolve({status: true});
            })
            .catch(reject)
        })
    })
}

function transformQuery(query){
    var queryStr = '';
    query = query || {};
    var keys = Object.keys(query);
    keys.forEach(function(key){
        if(queryStr)
            queryStr += ' AND ';

        var val = query[key];

        if(key === 'type'){
            key = 'mimeType';
            if(val === 'folder')
                val = 'application/vnd.google-apps.folder'
        }

        if(key === 'title')
            key = 'name';


        if(Array.isArray(val)){
            var part = singleQuote(key) + " " + val[0] + " "+(val[0] === 'in'?val[1]:singleQuote(val[1]));
        }
        else {
            var part = key + "=" + singleQuote(val);
        }

        part = "(" + part + ")"
        queryStr += part;
    })

    return queryStr;
}

function singleQuote(val){
    return "'" + val + "'";
}

function normalizeListings(fileItem){
    fileItem.title = fileItem.name;
    fileItem.type = fileItem.mimeType == 'application/vnd.google-apps.folder' ? 'folder' : 'file';

    return fileItem;
}
