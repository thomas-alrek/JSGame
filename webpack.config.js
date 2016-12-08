var path = require('path');
var webpack = require('webpack');

minimize = process.argv.indexOf('--minimize') !== -1,

module.exports = {
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist/'),
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
    ]},
    vue: {
        loaders: {
            js: 'babel?presets[]=es2015'
        }
    },
    resolve: {
        root: [path.resolve('./src'), path.resolve('./node_modules')],
        extensions: ['', '.js']
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.DedupePlugin(),
    ]
};