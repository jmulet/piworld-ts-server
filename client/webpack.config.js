const path = require('path');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CssEntryPlugin = require("css-entry-webpack-plugin");
const version = require('./package.json').version;
const CopyPlugin = require('copy-webpack-plugin');
 
module.exports = {
    entry: {
        'vendor': "./src/vendor.js",
        'styles': ["./node_modules/bootstrap/dist/css/bootstrap.min.css",
                 "./node_modules/bootstrap/dist/css/bootstrap-theme.min.css",
                 "./node_modules/admin-lte/dist/css/AdminLTE.min.css",
                 "./node_modules/admin-lte/dist/css/skins/skin-blue.min.css",
                 "./node_modules/admin-lte/dist/css/skins/skin-red.min.css",
                 "./node_modules/admin-lte/dist/css/skins/skin-yellow.min.css",
                 "./src/libs/angular/growl/angular-growl.min.css",
                 "./src/mystyles.css"],
        'login': ["./src/apps/login/login.js", "./src/apps/login/login.css"],
        'admin/admin': "./src/apps/admin/home.js"
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
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            // (the commons chunk name)          
            filename: "common." + version + ".js",
            // (the filename of the commons chunk)          
            minChunks: 3,
            // (Modules must be shared between 3 entries)          
            // chunks: ["pageA", "pageB"],
            // (Only use these entries)
        }),
        // Aixo fa el tree shaking a més de comprimir
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                drop_console: false,
                warnings: false,
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            }
        }),
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
        new ExtractTextPlugin("[name]."+version+".bundle.css", {allChunks: false}),
        new CopyPlugin([
            {from: 'src/assets', to: 'assets'} 
        ])
    ],
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
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