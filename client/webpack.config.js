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

module.exports = {
    entry: {
        'vendor': "./src/vendor.js",
        'vendor5': "./src/vendor5.ts",
        'polyfills': "./src/polyfills.ts",
        'pwc': "./src/pwc.js",
        'styles': ["./node_modules/bootstrap/dist/css/bootstrap.min.css",
            "./node_modules/bootstrap/dist/css/bootstrap-theme.min.css",
            "./node_modules/admin-lte/dist/css/AdminLTE.min.css",
            "./node_modules/admin-lte/dist/css/skins/skin-blue.min.css",
            "./node_modules/admin-lte/dist/css/skins/skin-red.min.css",
            "./node_modules/admin-lte/dist/css/skins/skin-yellow.min.css",
            "./src/libs/angular/growl/angular-growl.min.css",
            "./src/mystyles.css"],
        'login': ["./src/apps/login/login.js", "./src/apps/login/login.css"],
        'admin/admin': ["./src/apps/admin/admin.js", "./node_modules/angular-multiple-select/build/multiple-select.min.css"],
        'desktop/desktop': ["./src/apps/desktop-ts/desktop.ts", "./src/apps/desktop-ts/desktop.css"],
        'classroom/classroom': "./src/apps/classroom/classroom.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist', 'public'),
        filename: '[name].' + version + '.bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            EJSON: 'ejson',
            CryptoJS: 'crypto-js'
        }),
        new CleanWebpackPlugin(['dist/public'], {
            exclude: ['*.html']
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
        // This is the AoT compiler; requires @angular/compiler-cli
        new AngularCompilerPlugin({
            tsConfigPath: './tsconfig.json',
            entryModule: './src/apps/desktop-ts/desktop.module#AppModule',
            sourceMap: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common'],
            // (the commons chunk name)          
            filename: '[name].' + version + '.js',
            // (the filename of the commons chunk)          
            minChunks: Infinity,
            // (Modules must be shared between 3 entries)          
            // chunks: ["pageA", "pageB"],
            // (Only use these entries)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor5', 'polyfills'],
            // (the commons chunk name)          
            filename: '[name].' + version + '.js',
            // (the filename of the commons chunk)          
            minChunks: Infinity,
            // (Modules must be shared between 3 entries)          
            // chunks: ["pageA", "pageB"],
            // (Only use these entries)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
            // (the commons chunk name)          
            filename: '[name].' + version + '.js',
            // (the filename of the commons chunk)          
            minChunks: Infinity,
            // (Modules must be shared between 3 entries)          
            // chunks: ["pageA", "pageB"],
            // (Only use these entries)
        }),
        // Aixo fa el tree shaking a més de comprimir
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
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            //This is the AoT compiler
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack'
            }
            ,
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
                    'ts-loader'
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
    }
};