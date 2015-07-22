var inlinify = require('../lib');
var fs = require('fs');
var path = require('path');
var Browserify = require('browserify');

var browserify = Browserify()
	.on('file', console.log)
	.transform(inlinify)
	.add('./fixtures/index.js')
	.bundle(function (error, buffer) {
		if (error) return console.error(error);
		var script = buffer.toString();
		console.log(script);
		console.log('########################\n');
		eval(script);
	});
