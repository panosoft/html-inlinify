var escape = require('js-string-escape');
var inlineHtml = require('inline-html');
var path = require('path');
var staticModule = require('static-module');
var through = require('through2');

module.exports = function (file, options) {
	var inline = function (filePath, options) {
		var stream = through();
		inlineHtml(filePath, options)
			.then(function (html) {
				html = 'Promise.resolve(\'' + escape(html) + '\')';
				stream.end(html);
			})
			.catch(function (error) {
				// TODO swap once static-module properly relays the stream
				// error event stream.emit('error', error);
				sm.emit('error', error);
			});
		return stream
	};
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