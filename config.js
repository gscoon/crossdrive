const Path  = require('path');

const rootDir = __dirname;

module.exports = {
    root        : rootDir,
    tokenPath   : Path.join(rootDir, '.tmp/tokens.json'),
    providers   : ['googledrive']
}
