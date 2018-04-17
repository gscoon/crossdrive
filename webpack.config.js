const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    resolve : {
        alias : {
            googleapis: "empty-module"
        }
    },
    output: {
        filename: 'crossdrive.js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: {
    },
};
