/* global require module */

const sourceDir = 'src';

const webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./webpack.common.js');
const configs = require('./configs.json');

const copy = new CopyWebpackPlugin([
    {
        from: `${sourceDir}/sw.js`,
        transform: (content, path) =>
            content.toString()
                .replace(/#sw-cache-string#/g, (new Date().getTime()))
                .replace(/#sw-origin#/g, configs.origin)
    },
    {
        from: `${sourceDir}/manifest.json`,
        transform: (content, path) =>
            content.toString()
                .replace(/#manifest-origin#/g, configs.origin)
    }
]);
const html = new HtmlWebpackPlugin({
    template: `${sourceDir}/index.ejs`,
    templateParameters: {
        titlePrefix: '',
        baseUrl: configs.domain + configs.origin
    },
    hash: true
});

module.exports = WebpackMerge(commonConfig, {
    mode: 'production',
    plugins: [
        copy,
        new UglifyJSPlugin(),
        html
    ]
});
