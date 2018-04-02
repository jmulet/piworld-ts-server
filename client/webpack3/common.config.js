const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CssEntryPlugin = require("css-entry-webpack-plugin");
const version = require('../package.json').version;
const CopyPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const helpers = require('./node.helpers');
const ngRouterLoader = require('angular-router-loader');

module.exports = {
    entry: {
        'vendor': "./src/vendor.ts",
        'polyfills': "./src/polyfills.ts",      
        'styles': [
            "./node_modules/bootstrap/dist/css/bootstrap.min.css",
            "./node_modules/primeng/resources/primeng.min.css",
            "./node_modules/primeng/resources/themes/omega/theme.css",
            "./node_modules/font-awesome/css/font-awesome.min.css",
            "./node_modules/ionicons/css/ionicons.min.css",
            "./src/mystyles.css"],
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
            CryptoJS: 'crypto-js',
            Popper: 'popper.js'
        }),
        new CleanWebpackPlugin(['../dist/public'], {
            exclude: ['*.html']
        }),
         // Move everything that is shared in entries chunks ---> to bundle vendor       
         new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['classroom/classroom', 'admin/admin'],
            //filename: '[name].' + version + '.js',
            minChunks: 2
        }),
     
        // This is the common or manifest: extracts webpack boilerplate
        new webpack.optimize.CommonsChunkPlugin({
         name: "common",
         filename: '[name].' + version + '.js',
         chunks: ['vendor'],
         minChunks: Infinity        
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
        /*
        new CssEntryPlugin({
            output: {
              filename: "[name]/[name]."+version+".bundle.css"
            }
        }),
        */
        new ExtractTextPlugin("[name]." + version + ".bundle.css", { allChunks: false }),
        new CopyPlugin([
            { from: 'src/assets', to: 'assets' }
        ])
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
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [ { loader: "css-loader",
                             options: { minimize: true } }
                    ]
                })
            },
            /* {
                test: /\.js$/,
                exclude:  /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },*/
          
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
    node:  {
        fs: "empty"
    }
    
};