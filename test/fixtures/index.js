var inline = require('inline-html');
var path = require('path');
var co = require('co');

module.exports = co.wrap(function * () {
	return yield inline(path.resolve(__dirname, './index.html'));
});
