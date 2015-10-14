var escape = require('js-string-escape');
var inline = require('inline-html');
var path = require('path');
var R = require('ramda');
var StaticModule = require('static-module');
var through = require('through2');

var htmlInlinify = function (file) {
	var staticInline = function (method, html, options) {
		options = R.merge(options, {verbose: true});
		var stream = through();
		var files;
		inline[method](html, options)
			.then(result => {
				files = result.files;
				var inlinedHtml = escape(result.html);
				var staticReplacement = `Promise.resolve('${inlinedHtml}')`;
				stream.end(staticReplacement);
			})
			.catch(error => {
				files = error.files;
				console.error(error);
				staticModule.emit('error', error);
			})
			.then(() => {
				// add inlined files to watchify watch list
				R.forEach(file => staticModule.emit('file', file), files);
			});
		return stream;
	};
	var staticInlineHtml = (html, options) => staticInline('html', html, options);
	var staticInlineFile = (filename, options) => staticInline('file', filename, options);
	var staticModule = StaticModule(
		{
			'inline-html': { html: staticInlineHtml, file: staticInlineFile }
		},
		{
			vars: { __filename: file, __dirname: path.dirname(file) },
			varModules: { path: path }
		}
	);
	return staticModule;
};

module.exports = htmlInlinify;
