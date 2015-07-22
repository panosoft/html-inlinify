var inline = require('inline-html');
var path = require('path');
var co = require('co');

var definition = co.wrap(function * () {
	return {
		main: yield inline(path.resolve(__dirname, './index.html'))
	};
});

definition()
	.then(console.log)
	.catch(console.error);
