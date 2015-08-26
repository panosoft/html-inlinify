var Browserify = require('browserify');
var expect = require('chai')
	.use(require('chai-as-promised'))
	.expect;
var htmlInlinify = require('../lib');
var fs = require('fs');
var path = require('path');
var requireString = require('@panosoft/require-string');

var bundle = function (filename) {
	return new Promise(function (resolve, reject) {
		Browserify({standalone: 'test'})
			.transform(htmlInlinify)
			.add(filename)
			.bundle(function (error, buffer) {
				if (error) return reject(error);
				resolve(buffer.toString());
			});
	});
};

describe('htmlInlinify', function () {
	it('statically evaluate inline-html calls', function () {
		var entry = path.resolve(__dirname, 'fixtures/index.js');
		var html = fs.readFileSync(path.resolve(__dirname, 'fixtures/index.html'), 'utf8');
		return bundle(entry)
			.then(function (bundle) {
				var exports = requireString(bundle);
				return expect(exports()).to.eventually.equal(html);
			});
	});
});
