/* global require module */

const sourceDir = 'src';

const WebpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const copy = new CopyWebpackPlugin([
    {
        from: sourceDir + '/manifest.json',
        transform: function (content, path) {
            return content.toString()
                .replace(/#manifest-origin#/g, '/');
        }
    }
]);

const html = new HtmlWebpackPlugin({
    template: sourceDir + '/index.ejs',
    templateParameters: {
        titlePrefix: '[DEBUG] ',
        baseUrl: '/'
    }
});

module.exports = WebpackMerge(commonConfig, {
    devtool: 'inline-source-map',
    plugins: [
        copy,
        html
    ]
});
