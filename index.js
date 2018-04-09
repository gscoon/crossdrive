// here's my buffer
// here's the directory
// here's the provider
// here's the public key
const util = require('./util.js');

var Provider = {
    googledrive: require('./providers/googledrive.js')
}

module.exports = setProvider;

// credentials: client_secret, client_id, redirect url
function setProvider(provider, credentials, scopes){
    if(!Provider[provider])
        throw 'Bad provider';

    util.checkTokenFile();

    Provider[provider].createClient(credentials, scopes);

    return Provider[provider];
}
