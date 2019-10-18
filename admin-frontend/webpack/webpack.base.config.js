const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const cssExtractTextPlugin = new ExtractTextPlugin("bundle.css");
const htmlExtractTextPlugin = new ExtractTextPlugin("index.html");

const webpack = {
    entry: './src/index.jsx',

    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '..', 'dist/admin')
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /.(js|jsx)?$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: cssExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'less-loader'
                    }],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.html$/,
                use: htmlExtractTextPlugin.extract('html-loader')
            },
        ]
    },

    plugins: [
        cssExtractTextPlugin,
        htmlExtractTextPlugin
    ]
};

module.exports = webpack;
