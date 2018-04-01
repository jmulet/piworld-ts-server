const merge = require('webpack-merge');
const commonConfig = require('./common.config');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;

module.exports = merge(commonConfig, {
 
    optimization: {
        minimize: true
    },

    plugins: [
        // This is the AoT compiler; requires @angular/compiler-cli
        new AngularCompilerPlugin({
            tsConfigPath: './tsconfig-aot.json',
            entryModule: './src/apps/login/login.module#LoginModule',
            sourceMap: true
        }),
        

        // Aixo fa el tree shaking a més de comprimir
        /**
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                exclude: ["picklist", "oclazyload"]
            },
            compress: {
                drop_console: false,    //Change in production
                warnings: false,
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true
            }
        }),
        **/

        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),

        /*
        new CssEntryPlugin({
            output: {
              filename: "[name]/[name]."+version+".bundle.css"
            }
        }),
        */
    ],
    module: {
        /**
        rules: [
            //This is the AoT compiler
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack'
            }
        ]
        */
    }

});
