const base = require('./webpack/webpack.base.config.js');
const merge = require('webpack-merge');

module.exports = merge(base, {
    mode: 'development',
    watch: true,
    devServer: {
	port: 7020,
        contentBase: './dist/',
	historyApiFallback: true
    }
});
