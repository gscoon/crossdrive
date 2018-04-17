const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    resolve : {
        alias : {
            googleapis: path.resolve(__dirname, './src/fakegoogle.js'),
        }
    },
    output: {
        filename    : 'crossdrive.js',
        path        : path.resolve(__dirname, './dist'),
        // library     : 'crossdrive',
        libraryTarget: 'commonjs2'
    },
    externals: {},
};
