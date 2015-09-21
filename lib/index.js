var escape = require('js-string-escape');
var inlineHtml = require('inline-html');
var path = require('path');
var R = require('ramda');
var staticModule = require('static-module');
var through = require('through2');

module.exports = function (file, options) {
	var inline = function (filePath, options) {
		var stream = through();
		options = R.merge(options, {verbose: true});
		inlineHtml(filePath, options)
			.then(function (result) {
				var html = 'Promise.resolve(\'' + escape(result.html) + '\')';
				stream.end(html);
				// add inlined files to watch list
				result.files.forEach(function (file) {
					sm.emit('file', file);
				});
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
