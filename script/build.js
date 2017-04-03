/**
 * Build script
 *
 * This script automatically bundles and minifies package.json
 * into a single file, located under ./dist
 * 
 * @package jsgame
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */
 
'use strict';

const buildpackage = require('../package.json');
const buildpath = './dist/';
//const bundlename = buildpackage.name + '-' + buildpackage.version;
const bundlename = buildpackage.name;
const bundler = require('browserify')();
const compressor = require('uglify-js');
const fs = require('fs');

if (!fs.existsSync(buildpath)){
	fs.mkdirSync(buildpath);
}

const stream = fs.createWriteStream(buildpath + bundlename + '.js');

stream.on('finish', () => {
	console.log('Building ' + buildpath + bundlename + '.min.js');
	const result = compressor.minify('./' + buildpath + bundlename + '.js', {
		outSourceMap: bundlename + '.min.js.map',
	});
	const minified = result.code;
	let sourcemap = JSON.parse(result.map);
	sourcemap.sources = ['jsgame.js'];
	sourcemap = JSON.stringify(sourcemap);
	fs.writeFileSync(buildpath + bundlename + '.min.js' , minified, 'utf8');
	console.log('Creating ' + buildpath + bundlename + '.min.js.map');
	fs.writeFileSync(buildpath + bundlename + '.min.js.map', sourcemap, 'utf8');
});

console.log('Buidling ' + buildpackage.name + ' ' + buildpackage.version);
console.log('Building ' + buildpath + bundlename);

bundler
	.add('./' + buildpackage.main)
   .transform('babelify', { presets: ['es2015', 'stage-0'] })
	.bundle()
	.pipe(stream);
