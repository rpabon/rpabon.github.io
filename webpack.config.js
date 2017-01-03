var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
var ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve('./src'),
    entry: {
        main: './js/main.js'
    },
    output: {
        path: path.resolve('./build/'),
        filename: "js/bundle.js"
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new ExtractTextPlugin('css/[name].css', { allChunks: true }),
        new HtmlWebpackPlugin({
            title: 'Ricardo Pabón'
        }),
        new StyleExtHtmlWebpackPlugin(),
        new ScriptExtHtmlWebpackPlugin({
            inline: ['bundle.js']
        })
    ],
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!postcss!sass') //first sass, then css
            }
        ]
    },
    watch: true
};
