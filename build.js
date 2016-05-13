/* NPM build scripts
 * COPYRIGHT THOMAS ALREK 
 *
 * This script automatically bundles and minifies package.json
 * into a single file, located under ./dist
 *
 */
 
"use strict";

var buildpackage = require("./package.json");
var buildpath = "./dist/";
var bundlename = buildpackage.name + "-" + buildpackage.version;
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
		outSourceMap: bundlename + ".js.map"
	});
	var minified = result.code;
	var sourcemap = result.map;
	fs.writeFileSync(buildpath + bundlename + ".js.min" , minified, 'utf8');
	console.log("Creating " + buildpath + bundlename + ".js.map");
	fs.writeFileSync(buildpath + JSON.parse(sourcemap).file, sourcemap, 'utf8');
	console.log("Done");
});

console.log("Buidling " + buildpackage.name + " " + buildpackage.version);
console.log("Building " + buildpath + bundlename);
bundler.add('./' + buildpackage.main);
bundler.bundle().pipe(stream);