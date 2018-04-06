const merge = require('webpack-merge');
const commonConfig = require('./common.config');
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;

module.exports = merge(commonConfig, {
    entry: {
        'admin/admin': ["./compiled/src/apps/admin/admin-aot.js", "./src/apps/admin/admin.css"],         
        'classroom/classroom': ["./compiled/src/apps/classroom/classroom-aot.js", "./src/apps/classroom/classroom.css"],
        'filemanager/filemanager': ["./src/apps/filemanager/filemanager-aot.ts", "./src/apps/filemanager/filemanager.css"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'ts-loader',
                    'angular-router-loader?loader=system&genDir=compiled&aot=true'
                ]
            },
            {
                test: /\.jsx?$/,
                use: [
                   /*  // must transpile to es5
                    { loader: 'babel-loader',                                                
                       options: {
                          presets: ['@babel/preset-env']
                       }
                    },
                    */
                    // Unfortunately, This produces arrow functions when using loader: 'system'
                    'angular-router-loader?genDir=compiled&aot=true'
                ]
            }
        ]
    },
   
    plugins: [
 
        new UglifyJsPlugin({
            uglifyOptions: {
                output: {
                    comments: false,
                    beautify: false,
                }
            }
        }),
 
        /*  //Uglify does not work with webpack -p
         new webpack.optimize.UglifyJsPlugin({
             sourceMap: false,
             compress: {
                 drop_console: true,    //Change in production
                 warnings: false,
                 sequences: true,
                 dead_code: true,
                 conditionals: true,
                 booleans: true,
                 unused: true,
                 if_return: true,
                 join_vars: true
             }
         })
          */
       

        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),

    ]
});