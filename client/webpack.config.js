const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CssEntryPlugin = require("css-entry-webpack-plugin");
const version = require('./package.json').version;
const CopyPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const helpers = require('./node.helpers');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const ngRouterLoader = require('angular-router-loader');

module.exports = {
    entry: {
        'vendor': "./src/vendor.ts",
        'polyfills': "./src/polyfills.ts",
        'login': ["./src/apps/login/login.ts", "./src/apps/login/login.css"],
        'admin/admin': ["./src/apps/admin/admin.ts", "./src/apps/admin/admin.css"],         
        'desktop/desktop': ["./src/apps/desktop/desktop.ts", "./src/apps/desktop/desktop.css"],
        //'classroom/classroom': "./src/apps/classroom/classroom.js"

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
            //'vendor': "./src/vendorjs.js",
            //'pwc': "./src/pwc.js",
    },
    output: {
        path: path.resolve(__dirname, 'dist', 'public'),
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
        new CleanWebpackPlugin(['dist/public'], {
            exclude: ['*.html']
        }),
         // Move everything that is shared in entries login, vendor ---> to bundle vendor       
         new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: ['desktop/desktop', 'admin/admin', 'login'],
            //filename: '[name].' + version + '.js',
            minChunks: 2
        }),
     
        // This is the common or manifest: extracts webpack boilerplate
        new webpack.optimize.CommonsChunkPlugin({
         name: "common",
         filename: '[name].' + version + '.js',
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
        // This is the AoT compiler; requires @angular/compiler-cli
        new AngularCompilerPlugin({
            tsConfigPath: './tsconfig.json',
            entryModule: './src/apps/desktop-ts/desktop.module#AppModule',
            sourceMap: true
        }),
       */
        // Aixo fa el tree shaking a més de comprimir
        /*
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
        */
        /*
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
        
         /*
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),
        */
       
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
            'jquery': 'jquery/dist/jquery.slim.js',
        }
    },
    module: {
        rules: [
            /*
            //This is the AoT compiler
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack'
            }
            ,
            */
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
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
                test: /\.tsx?$/,
                use: [                    
                    'ts-loader',
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