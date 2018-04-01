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

const outputDir = path.resolve(__dirname, '../dist', 'public');
console.log("outputDir", outputDir)

module.exports = {
    entry: {
        'login': ["./src/apps/login/login.ts", "./src/apps/login/login.css"],
        'admin/admin': ["./src/apps/admin/admin.ts", "./src/apps/admin/admin.css"],         
        'desktop/desktop': ["./src/apps/desktop/desktop.ts", "./src/apps/desktop/desktop.css"],
        'classroom/classroom': ["./src/apps/classroom/classroom.ts", "./src/apps/classroom/classroom.css"],

        'styles': [
            "./node_modules/bootstrap/dist/css/bootstrap.min.css",
            "./node_modules/coreui.io/Static_Starter_GULP/css/font-awesome.min.css",
            "./node_modules/coreui.io/Static_Starter_GULP/css/simple-line-icons.css",
            "./node_modules/coreui.io/Static_Starter_GULP/css/style.css",
            // "./node_modules/bootstrap/dist/css/bootstrap-theme.min.css",
            "./node_modules/primeng/resources/primeng.min.css",
            "./node_modules/primeng/resources/themes/omega/theme.css",
            //"./src/assets/css/AdminLTE.css",    //It has been modified to change some rules
            //"./node_modules/admin-lte/dist/css/skins/skin-blue.min.css",
            //"./node_modules/admin-lte/dist/css/skins/skin-red.min.css",
            //"./node_modules/admin-lte/dist/css/skins/skin-yellow.min.css",
            //"./src/libs/angular/growl/angular-growl.min.css",
            "./src/mystyles.css"]
            //'vendor': "./src/vendorjs.js"
    },

    output: {
        path: outputDir,
        filename: '[name].' + version + '.bundle.js',
        chunkFilename: '[name].chunk.' + version + '.js'
    },

    optimization: {
        splitChunks: { 
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: "vendor",
            cacheGroups: {
                default: {
                    //test: /[\\/]*.(js|ts)$/,      
                    minChunks: 5,
                    priority: -20,
                    //reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,      
                    priority: -10,
                    enforce: true
                }
            }
        }          
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
    
        /*
        new HtmlWebpackPlugin({
            chunks: ['desktop/desktop'],
            inject: true,
            template: '!!raw-loader!../server/src/main.app/views/desktop-template.ejs',
			filename: '../server/src/main.app/views/desktop.ejs',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				conservativeCollapse: true
			}
        }),
        */
    
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows

            // For Angular 5, see also https://github.com/angular/angular/issues/20357#issuecomment-343683491
            /\@angular(\\|\/)core(\\|\/)esm5/,
            helpers.root('../src'), // location of your src
            {
                // your Angular Async Route paths relative to this root directory
            }
        ),
        
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
            'jquery': 'jquery/dist/jquery.slim.js',
        }
    },
    module: {
        rules: [
            // Extract text plugin broken in webpack4 use @next
             {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            /*
             {
                test: /\.tsx?$/,
                use: [                    
                    'ts-loader',
                    'angular-router-loader'
                ]
            },
            */
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                use: ['ts-loader', //'@ngtools/webpack'
                     'angular-router-loader'
                    ]
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
                test: /\.(html|htm|ejs)$/,
                exclude: /node_modules/,
                loader: 'raw-loader'
            }
        ]
    }, 
    node:  {
        fs: "empty"
    }
};