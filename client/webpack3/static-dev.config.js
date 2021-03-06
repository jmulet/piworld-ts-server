const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CssEntryPlugin = require("css-entry-webpack-plugin");
const version = require('../package.json').version;
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const helpers = require('./node.helpers');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        'login': ["./src/apps/login/login.ts", 
                  "./src/apps/login/login.css",
                  "./node_modules/bootstrap/dist/css/bootstrap.min.css",    
                  "./node_modules/font-awesome/css/font-awesome.min.css",             
                ],
        'desktop': ["./src/apps/desktop/desktop.ts", 
                    "./src/apps/desktop/desktop.css",                   
                    "./node_modules/bootstrap/dist/css/bootstrap.min.css",
                    "./src/assets/libs/admin-lte3/dist/css/adminlte.min.css",
                    "./node_modules/font-awesome/css/font-awesome.min.css",
                    "./node_modules/ionicons/css/ionicons.min.css",
                    /*
                    "./src/assets/libs/admin-lte3/dist/css/skins/skin-blue.min.css",
                    "./src/assets/libs/admin-lte3/dist/css/skins/skin-red.min.css",
                    "./src/assets/libs/admin-lte3/dist/css/skins/skin-yellow.min.css",                    
                    */
                    "./src/mystyles.css"
                ]
    },
    output: {
        path: path.resolve(__dirname, '../dist', 'public'),
        filename: '[name].' + version + '.bundle.js',
        chunkFilename: '[name].chunk.' + version + '.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            EJSON: 'ejson',
            CryptoJS: 'crypto-js'
        }),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows

            // For Angular 5, see also https://github.com/angular/angular/issues/20357#issuecomment-343683491
            /\@angular(\\|\/)core(\\|\/)esm5/,
            helpers.root('src'), // location of your src
            {
                // your Angular Async Route paths relative to this root directory
            }
        ),
        new ExtractTextPlugin("[name]." + version + ".bundle.css", { allChunks: false }),
    
    ],
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            // This alias selects jquery.slim (No ajax, No effects) instead of full jquery.
            'jquery': 'jquery/dist/jquery.js',
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'ts-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: { minimize: true }
                    }
                    ]
                })
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader?name=images/[name].[ext]',
                        options: {
                            bypassOnDebug: true,
                        },
                    },
                ],
            },

            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw-loader'
            }
        ]
    },
    node: {
        fs: "empty"
    }

};