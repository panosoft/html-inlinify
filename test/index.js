var Browserify = require('browserify');
var co = require('co');
var expect = require('chai')
	.use(require('chai-as-promised'))
	.expect;
var htmlInlinify = require('../lib');
var fs = require('fs');
var path = require('path');
var requireString = require('@panosoft/require-string');

var bundleModule = function (filename) {
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
	it('statically evaluate inline-html calls', () => co(function * () {
		var entry = path.resolve(__dirname, 'fixtures/index.js');
		var fileHtml = fs.readFileSync(path.resolve(__dirname, 'fixtures/index.html'), 'utf8');
		var bundle = yield bundleModule(entry);
		var moduleExports = requireString(bundle);
		moduleExports = yield moduleExports();
		expect(moduleExports).to.have.property('file').that.equals(fileHtml);
		expect(moduleExports).to.have.property('html').that.equals('HTML');
	}));
});
