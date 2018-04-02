const merge = require('webpack-merge');
const commonConfig = require('./common.config');
const path = require('path'); 
const webpack = require('webpack');

module.exports = merge(commonConfig, {
    entry: {
        'admin/admin': ["./src/apps/admin/admin.ts", "./src/apps/admin/admin.css"],         
        'classroom/classroom': ["./src/apps/classroom/classroom.ts", "./src/apps/classroom/classroom.css"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'ts-loader',
                    'angular2-template-loader?{configFileName: "tsconfig.json"}',
                    'angular-router-loader?loader=system&genDir=compiled&aot=false'
                ]
            }
        ]
    },  
});