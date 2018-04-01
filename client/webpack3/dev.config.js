const merge = require('webpack-merge');
const commonConfig = require('./common.config');
const path = require('path'); 
const webpack = require('webpack');

module.exports = merge(commonConfig, {
    entry: {
        //'login': ["./src/apps/login/login.ts", "./src/apps/login/login.css"],
        'admin/admin': ["./src/apps/admin/admin.ts", "./src/apps/admin/admin.css"],         
        //'desktop': ["./src/apps/desktop/desktop.ts", "./src/apps/desktop/desktop.css"],
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