var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: ['babel-polyfill', './src/jsgame.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'jsgame.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	},
	resolve: {
		root: [path.resolve('./src'), path.resolve('./node_modules')],
		extensions: ['', '.js']
	},
	stats: {
		colors: true
	},
	devtool: 'source-map'
};