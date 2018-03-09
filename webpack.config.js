/*
* Webpack dev config file [STARTING POINT]
* sidrit tandafili <forge405@gmail.com>
* https://github.com/sidis405/packstart
*/

//Supportin context, to serve bundle.js and index.html
//from different paths
var path = require('path');

//yes. webpack.
var webpack = require('webpack');

//Require this to pluck out the css out of the js bundle file
//-UNCOMMENT TO USE THIS - DO this to prevent the flash of unstyled markup
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
var extractCss = new ExtractTextPlugin("styles.css");

//create plugin with common code
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('shared');

module.exports = {
    //Resolve path context for js files
    context: path.resolve('js'),
    //Define entty points. File extensions are resolve in the
    // 'resolve' section
    entry: {
        index: '../index.js',
    },
    output: {
        //where to output the bundle
        path: path.resolve('dist/assets/'),
        //where to serve it from to the http server
        publicPath: '/assets/',
        //filename varying on entry point
        filename: '[name].js'
    },

    //plugins here
    plugins: [commonsPlugin, extractCss,
        new BrowserSyncPlugin({
                host: 'localhost',
                port: 3000,
                proxy: 'http://localhost:8080/'
            }),
        // Just a simple banner for the generated bundles. Feel free to modify or remove
        new webpack.BannerPlugin("*\n* Generated by PackStart\n* Sidrit Trandafili <forge405@gmail.com>\n**\n")
    ],


    devServer: {
        //rewrite the base of urls for public content
        contentBase: 'dist'
    },

    module: {
        loaders:
        [

            {
                test: /\.dart$/,

                loader: 'dart-loader'
            },
            {
                // Es6 Transfpiling
                // presets in .babelrc
                test: /\.es6$/,

                loader: "babel-loader"
            },

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                  ]
                })
              },
            {
                // SASS support
                test: /\.scss$/,

                loader: ExtractTextPlugin.extract("style-loader" , "css-loader!autoprefixer-loader!sass-loader")
                // loader: "style-loader!css-loader!autoprefixer-loader!sass-loader"
            },
            {
                // LEss support
                test: /\.less$/,

                loader: ExtractTextPlugin.extract("style-loader" , "css-loader!autoprefixer-loader!less-loader")
                // loader: "style-loader!css-loader!autoprefixer-loader!less-loader"
            },
            // Images and Font support
            {
                test: /\.(png|jpg|ttf|eot)$/,
                exclude: /node_modules/,
                // This limit is 100K. It's just a proof of concept. Lower it
                loader: 'url-loader?limit=100000'
            }
        ]
    },

    resolve: {
        //extenstions to outomatically resolve
        extensions: ['.dart', '.js', '.es6']
    }
}

