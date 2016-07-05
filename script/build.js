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
 
"use strict";

var buildpackage = require("../package.json");
var buildpath = "./dist/";
//var bundlename = buildpackage.name + "-" + buildpackage.version;
var bundlename = buildpackage.name;
var bundler = require('browserify')();
var compressor = require("uglify-js");
var fs = require("fs");

if (!fs.existsSync(buildpath)){
	fs.mkdirSync(buildpath);
}

var stream = fs.createWriteStream(buildpath + bundlename + ".js");

stream.on('finish', function () {
	console.log("Building " + buildpath + bundlename + ".min.js");
	var result = compressor.minify("./" + buildpath + bundlename + ".js", {
		outSourceMap: bundlename + ".min.js.map",
	});
	var minified = result.code;
	var sourcemap = JSON.parse(result.map);
	sourcemap.sources = ["jsgame.js"];
	sourcemap = JSON.stringify(sourcemap);
	fs.writeFileSync(buildpath + bundlename + ".min.js" , minified, 'utf8');
	console.log("Creating " + buildpath + bundlename + ".min.js.map");
	fs.writeFileSync(buildpath + bundlename + ".min.js.map", sourcemap, 'utf8');
});

console.log("Buidling " + buildpackage.name + " " + buildpackage.version);
console.log("Building " + buildpath + bundlename);
bundler.add('./' + buildpackage.main);
bundler.bundle().pipe(stream);
