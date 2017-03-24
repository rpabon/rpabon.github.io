var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    context: path.resolve('./src'),
    entry: {
        main: './js/main.js'
    },
    output: {
        path: path.resolve('./build/'),
        filename: 'js/bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new ExtractTextPlugin('css/[name].css', { allChunks: true }),
        new HtmlWebpackPlugin({
            title: 'Ricardo Pabón',
            template: 'pug/index.pug'
        }),
        new BrowserSyncPlugin({
            server: {
                baseDir: ['build']
            },
            port: 3000,
            host: 'localhost',
            open: false
        })
    ],
    module: {
        devtool: 'source-map',
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!postcss!sass') //first sass, then css
            },
            {
                test: /\.(jpe?g|png)$/,
                loader: 'url-loader?name=img/[name].[ext]&limit=1000'
            },
            {
                test: /\.pug$/,
                loader: 'pug'
            }
        ]
    },
    watch: true
};
