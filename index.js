require('dotenv').config();
const Path      = require('path');
const util      = require(Path.join(__dirname,'./util.js'));
const debug     = require('debug')('crossdrive');

var Provider = {
    googledrive: require(Path.join(__dirname, './providers/googledrive.js'))
}

module.exports = setProvider;

// access_token, refresh_token
function setProvider(provider, tokenData){
    if(!Provider[provider])
        throw 'Bad provider';

    util.checkTokenFile();
    util.setToken(provider, tokenData)

    Provider[provider].createClient(tokenData);

    return Provider[provider];
}
