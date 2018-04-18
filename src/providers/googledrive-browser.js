const axios         = require('axios');
const urljoin       = require('url-join');
const util          = require('./../util.js');
const uuid          = require('uuid');
const async         = require('async');
const Path          = require('react-native-path');
const debug         = require('debug')('xdrive-googlebrowser');

module.exports = {
    createClient    : createClient,
    list            : listFiles,
    upload          : createFile,
    createFolder    : createFolder,
    tokenCheck      : tokenCheck,
    deleteFile      : deleteFile,
    download        : downloadFile,
}

const apiHost = 'https://www.googleapis.com'
const apiPath = '/drive/v3/files';

var Credentials;
var CachedPaths = {};

function getAuthHeaders(){
    return {'Authorization': "Bearer " + Credentials.access_token}
}

function createClient(credentials){
    Credentials = credentials;
}

// FIX ME!!
function tokenCheck(){
    return true;
}

function listFiles(dirPath){
    debug('listFiles:', dirPath);
    return getFolderID(dirPath)
    .then((folderID)=>{
        debug('List files folderID:', folderID);
        if(!folderID)
            return false;

        return reqList(null, folderID);
    })
}

function downloadFile(filePath){
    var parentPath = Path.dirname(filePath);
    var fileName = Path.basename(filePath);
    return getFolderID(parentPath)
    .then((parentID)=>{
        return checkExistingFile(fileName, parentID)
    })
    .then((fileId)=>{
        if(!fileId)
            return Promise.reject("Missing file id");

        return reqDownload(fileId);
    })
    .then((response)=>{
        return response.data;
    })
}

function createFile(filePath, type, body){
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
            return reqUpdate(fileID, body);

        return reqCreate({
            type        : type,
            name        : fileName,
            body        : body,
            folder      : parentID,
        })
    })
    .then((item)=>{
        setCache(filePath, item.id);
        return item;
    })
}

function deleteFile(filePath){
    var parentPath = Path.dirname(filePath);
    var fileName = Path.basename(filePath);
    return getFolderID(parentPath)
    .then((parentID)=>{
        return checkExistingFile(fileName, parentID)
    })
    .then((fileId)=>{
        if(!fileId)
            return;

        return reqDelete(fileId);
    })
}

function checkExistingFile(fileName, parentID){
    debug('checkExistingFile', fileName, parentID)
    return reqList(fileName, parentID)
    .then((response)=>{
        if(!response.data.length)
            return false;

        return response.data[0]['id']
    })
}

function getFolderID(dirPath, doMakeDir){
    var key = util.keyify(dirPath);

    if(CachedPaths[key] && CachedPaths[key]['id'])
        return Promise.resolve(CachedPaths[key]['id']);

    return setAllFolderIDs(key, doMakeDir)
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

function createFolder(folderPath){
    return createFile(folderPath, 'folder');
}

function reqDownload(fileId){
    var fullURL = urljoin(apiHost, apiPath, fileId);
    return asyncReq({
        method  : 'GET',
        url     : fullURL,
        params  : {alt: 'media'},
    })
}

function reqList(name, parentID){
    // google drive query
    var qObj = {};
    if(parentID){
        if(typeof parentID === 'object')
            parentID = parentID.id;

        qObj[parentID] = ['in', 'parents'];
    }

    if(name)
        qObj.name = name;

    var fullURL = urljoin(apiHost, apiPath)

    return asyncReq({
        method  : 'GET',
        url     : fullURL,
        params  : {q: util.google.transformQ(qObj)},
    })
    .then((response)=>{
        return {
            data : response.data.files.map(util.google.normalize),
            next : response.data.nextPageToken,
        }
    })
}

function reqCreate(options){
    var resource = {
        mimeType    : options.type,
        name        : options.name
    }

    var isFolder = false;
    if(['folder','directory'].indexOf(options.type) > -1){
        resource.mimeType = 'application/vnd.google-apps.folder';
        isFolder = true;
    }

    var media = {mimeType: resource.mimeType};

    if(options.body)
        media.body = options.body;

    if(options.folder)
        resource.parents = [options.folder];

    var headers = {};

    // media, multipart
    if(isFolder || !media.body){
        var fullURL = urljoin(apiHost, apiPath);
        var uploadType = '';
        var data = resource;
    }
    else{
        var fullURL = urljoin(apiHost, 'upload', apiPath);
        var uploadType = (isFolder || !media.body) ? '' : 'multipart';
        var boundary = uuid.v4();
        var data = buildMultipart(resource, media, boundary);
        Object.assign(headers, {'Content-Type': "multipart/related; boundary=" + boundary});
    }

    return asyncReq({
        method  : 'POST',
        url     : fullURL,
        data    : data,
        params  : {uploadType: uploadType},
        headers : headers
    })
    .then((results)=>{
        return util.google.normalize(results.data)
    })
}

function reqDelete(fileId){
    var fullURL = urljoin(apiHost, apiPath, fileId);

    return asyncReq({
        method  : 'DELETE',
        url     : fullURL,
    })
}

function reqUpdate(fileId, body){
    var fullURL = urljoin(apiHost, 'upload', apiPath, fileId);

    return asyncReq({
        method  : 'PATCH',
        url     : fullURL,
        data    : body,
    })
}

function asyncReq(options){
    options.method = options.method || 'GET';
    options.headers = options.headers || {};
    Object.assign(options.headers, getAuthHeaders());
    return axios(options)
    .catch((err)=>{
        return Promise.reject(err.response);
    })
}

// fuck you axios
function buildMultipart(resource, media, boundary){
    var mimeType = media.mimeType || (resource && resource.mimeType);

    return [
        "--" + boundary,
        "Content-Type: application/json",
        "",
        JSON.stringify(resource),
        "",
        "--" + boundary,
		"Content-Type: " + mimeType,
        "",
        media.body,
        "--" + boundary + "--"
    ].join("\r\n");
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
