var escape = require('js-string-escape');
var inlineHtml = require('inline-html');
var path = require('path');
var staticModule = require('static-module');
var through = require('through2');

var inline = function (filePath, options) {
	var stream = through();
	inlineHtml(filePath, options)
		.then(function (html) {
			html = 'Promise.resolve(\'' + escape(html) + '\')';
			stream.end(html);
		})
		.catch(function (error) {
			stream.emit('error', error);
			// TODO remove once static-module responds to error event above
			console.error(error);
		});
	return stream
};

module.exports = function (file, options) {
	var sm = staticModule(
		{ 'inline-html': inline },
		{
			vars: {
				__filename: file,
				__dirname: path.dirname(file)
			},
			varModules: { path: path }
		}
	);
	return sm;
};