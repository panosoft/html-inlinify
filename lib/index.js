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
		var files;
		inlineHtml(filePath, options)
			.then(result => {
				files = result.files;
				var staticReplacement = 'Promise.resolve(\'' + escape(result.html) + '\')';
				stream.end(staticReplacement);
			})
			.catch(error => {
				files = error.files;
				console.error(error);
				sm.emit('error', error);
			})
			.then(() => {
				// add inlined files to watchify watch list
				R.forEach(file => sm.emit('file', file), files);
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
