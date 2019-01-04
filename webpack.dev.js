/* global require module */

const sourceDir = 'src';

const WebpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const html = new HtmlWebpackPlugin({
    template: sourceDir + '/index.html'
});

module.exports = WebpackMerge(commonConfig, {
    devtool: 'inline-source-map',
    plugins: [
        html
    ]
});
