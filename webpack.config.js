var path = require('path');

module.exports = {
	entry: ['babel-polyfill', './src/game.js'],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'game.js'
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