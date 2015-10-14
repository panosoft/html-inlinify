var inline = require('inline-html');
var path = require('path');
var co = require('co');

module.exports = co.wrap(function * () {
	return {
		file: yield inline.file(path.resolve(__dirname, './index.html')),
		html: yield inline.html('HTML')
	};
});
