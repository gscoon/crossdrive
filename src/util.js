const fs        = require('fs');
const Path      = require('react-native-path');
const config    = require('./config');

module.exports = {
    checkTokenFile  : checkTokenFile,
    getToken        : getToken,
    setToken        : setToken,
}

function getToken(provider){
    return getTokenData()
    .then((tokenData)=>{
        return tokenData[provider];
    })
}

function setToken(provider, token){
    return getTokenData()
    .then(function(tokenData){
        tokenData[provider] = token;
        return updateTokenFile(tokenData);
    })
}

function getTokenData(){
    return new Promise((resolve, reject)=>{
        fs.readFile(config.tokenPath, 'utf8', (err, content)=>{
            resolve(JSON.parse(content));
        })
    })
}

function updateTokenFile(data){
    return new Promise((resolve, reject) => {
        if(typeof data === 'object')
            data = JSON.stringify(data);

        fs.writeFile(config.tokenPath, data, (err)=>{
            if(err)
                return reject(err);

            return resolve();
        })
    })
}

function checkTokenFile(data){
    if(fs.existsSync(config.tokenPath))
        return Promise.resolve();

    return updateTokenFile({});
}
