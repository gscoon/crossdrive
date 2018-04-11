const fs            = require('fs');
const {google}      = require('googleapis');
const OAuth2Client  = google.auth.OAuth2;

const util          = require('../util');

const PROVIDER_KEY  = 'googledrive';

var Client;
var Drive;
var Scopes = [];

module.exports = {
    authorize       : authorize,
    completeAuth    : completeAuth,
    checkClient     : checkClient,
    createClient    : createClient,
    listFiles       : listFiles,
    getChildren     : getChildren,
    createFile      : createFile,
    uploadFile      : createFile,
}

// title
// modifiedDate
// pageSize

function listFiles(options, query){
    return new Promise((resolve, reject)=>{
        options = options || {};
        options.pageSize = options.pageSize || 40;
        if(options.query)
            options.q = transformQuery(options.query);

        Drive.files.list(options, (err, response) => {
            if(err)
                return reject(err);

            resolve({
                data : response.data.files.map(normalizeListings),
                next : response.data.nextPageToken,
            })
            resolve(response);
        })
    })
}

function getChildren(parentID){
    return new Promise((resolve, reject)=>{
        if(typeof parentID === 'object')
            parentID = parentID.id;

        var query = "'" + parentID + "' in parents";
        Drive.files.list({q: query}, (err, response)=>{
            if(err)
                return reject(err);

            resolve({
                data : response.data.files.map(normalizeListings),
                next : response.data.nextPageToken,
            })
        })
    })

}

function createFile(options){
    return new Promise((resolve, reject)=>{
        var resource = {
            mimeType    : options.type,
            name        : options.title
        }

        var media = {
            mimeType    : options.type,
        };

        if(options.body)
            media.body = options.body;

        if(options.type === 'folder')
            resource.mimeType = 'application/vnd.google-apps.folder';

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
        console.log("Authorizing...")
        if(!Client)
            return reject('Bad client');

        util.getToken(PROVIDER_KEY)
        .then(function(tokenData){
            if(!tokenData)
                return handleNew();

            console.log("Authorizing...", tokenData.access_token);
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
    var operators = ['<', '=', '>', '!'];
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

        // ugh
        // https://stackoverflow.com/questions/34735220/google-drive-api-query-by-name-returns-invalid/34776881
        if(key === 'title'){
            key = 'name';
        }

        var firstChar = val.charAt(0);
        // {modifiedData: ['>', ['']]}
        if(operators.indexOf(firstChar) >= 0){
            var part = key + "'" + val + "'";
        }
        else {
            var part = key + "='" + val + "'";
        }

        part = "(" + part + ")"
        queryStr += part;
    })

    console.log(queryStr);
    return queryStr;
}

function normalizeListings(fileItem){
    fileItem.title = fileItem.name;
    fileItem.type = fileItem.mimeType == 'application/vnd.google-apps.folder' ? 'folder' : 'file';

    return fileItem;
}
