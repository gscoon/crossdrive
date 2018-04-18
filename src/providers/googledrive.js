const {google}      = require('googleapis');
const async         = require('async');
const util          = require('./../util.js');
const Path          = require('react-native-path');
const debug         = require('debug')('xdrive-google');
const OAuth2Client  = google.auth.OAuth2;

const PROVIDER_KEY  = 'googledrive';

var Client;
var Drive;
var CachedPaths = {};
var Credentials;

module.exports = {
    createClient    : createClient,
    list            : listFiles,
    upload          : createFile,
    createFolder    : createFolder,
    tokenCheck      : tokenCheck,
    deleteFile      : deleteFile,
    download        : downloadFile,
}

function createClient(credentials){
    Credentials = credentials;

    // https://github.com/google/google-api-nodejs-client/issues/253#issuecomment-51705964
    Client = new OAuth2Client();

    Client.setCredentials({
        access_token: credentials.access_token,
        refresh_token: credentials.refresh_token,
    });

    Drive = google.drive({version: 'v3', auth: Client});

}

function tokenCheck(){
    debug('token check', Credentials.access_token)
    return Client.getTokenInfo(Credentials.access_token);
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
        var breakDown = util.google.breakDownFolders(dirPath);
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
            .catch(next)
        }, (err)=>{
            if(err) return reject(err);

            if(CachedPaths[dirPath])
                resolve(CachedPaths[dirPath]['id']);
            else
                resolve(null)
        })
    })
}

function pullOrCreate(dirPath, parentID, doCreate){
    var basename = Path.basename(dirPath);

    return reqList(basename, parentID)
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

function listFiles(dirPath){
    debug("listFiles", dirPath)
    return getFolderID(dirPath)
    .then((folderID)=>{
        if(!folderID)
            return false;

        return reqList(null, folderID);
    })
}

function createFile(filePath, type, bodyStream){
    var parentPath = Path.dirname(filePath);
    var fileName = Path.basename(filePath);
    var parentID;
    return getFolderID(parentPath, true)
    .then((_parentID)=>{
        parentID = _parentID;
        return checkExistingFile(fileName, parentID)
    })
    .then((fileID)=>{
        if(fileID)
            return reqUpdate(fileID, bodyStream);

        return reqCreate({
            type        : type,
            name        : fileName,
            body        : bodyStream,
            folder      : parentID,
        })
    })
    .then((item)=>{
        setCache(filePath, item.id);
        return item;
    })
}

function downloadFile(filePath){
    var parentPath = Path.dirname(filePath);
    var fileName = Path.basename(filePath);
    debug("downloadFile", parentPath, fileName);
    return getFolderID(parentPath)
    .then((parentID)=>{
        return checkExistingFile(fileName, parentID)
    })
    .then((fileId)=>{
        return  Drive.files.get({
            fileId: fileId,
            alt: 'media'
        }, {responseType: 'stream'})
    })
    .then((response)=>{
        return response.data;
    })
}

function deleteFile(filePath){
    return new Promise((resolve, reject)=>{
        var parentPath = Path.dirname(filePath);
        var fileName = Path.basename(filePath);
        return getFolderID(parentPath)
        .then((parentID)=>{
            return checkExistingFile(fileName, parentID)
        })
        .then((fileId)=>{
            if(!fileId)
                return resolve();

            Drive.files.delete({fileId}, function(err, data){
                if(err)
                    return reject(err);

                return resolve(data);
            })
        })
        .catch(reject)
    })

}

function checkExistingFile(fileName, parentID){
    return reqList(fileName, parentID)
    .then((response)=>{
        if(!response.data.length)
            return false;

        return response.data[0]['id']
    })
}

function createFolder(folderPath){
    return createFile(folderPath, 'folder');
}

function reqList(name, parentID){
    return new Promise((resolve, reject)=>{
        var queryObj = {};
        if(parentID){
            if(typeof parentID === 'object')
                parentID = parentID.id;

            queryObj[parentID] = ['in', 'parents'];
        }

        if(name)
            queryObj.name = name;

        Drive.files.list({q: util.google.transformQ(queryObj)}, (err, response)=>{
            if(err){
                debug(err);
                return reject(err);
            }

            resolve({
                data : response.data.files.map(util.google.normalize),
                next : response.data.nextPageToken,
            })
        })
    })
}

function reqCreate(options){
    return new Promise((resolve, reject)=>{
        var resource = {
            mimeType    : options.type,
            name        : options.name
        }

        if(['folder','directory'].indexOf(options.type) > -1)
            resource.mimeType = 'application/vnd.google-apps.folder';

        var media = {
            mimeType    : resource.mimeType,
        };

        if(options.body)
            media.body = options.body;

        if(options.folder)
            resource.parents = [options.folder]

        Drive.files.create({resource, media}, (err, results)=>{
            if (err)
                return reject(err);

            return resolve(util.google.normalize(results.data))
        });
    })
}

function reqUpdate(fileId, bodyStream){
    return new Promise((resolve, reject)=>{
        var media = {
            body    : bodyStream
        };

        Drive.files.update({media, fileId}, (err, results)=>{
            if (err)
                return reject(err);

            return resolve(util.google.normalize(results.data))
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
