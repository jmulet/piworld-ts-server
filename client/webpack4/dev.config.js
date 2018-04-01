const merge = require('webpack-merge');
const commonConfig = require('./common.config');
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = merge(commonConfig, {
    devtool: 'inline-source-map',
    plugins: [
/**
        new BrowserSyncPlugin({
            // browse to http://localhost:3200/ during development,
            // ./demo directory is being served
            host: 'localhost',
            port: 3100,
            proxy: 'http://localhost:3200/demo/',
        }, {
                reload: true
            }),
*/
    ]
});