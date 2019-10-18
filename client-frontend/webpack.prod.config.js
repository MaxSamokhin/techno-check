const base = require('./webpack/webpack.base.config.js');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(base, {
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: false
            })
        ]
    }
});
