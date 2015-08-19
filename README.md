# html-inlinify

Inline local assets referenced in an HTML document.

[![npm version](https://img.shields.io/npm/v/html-inlinify.svg)](https://www.npmjs.com/package/html-inlinify)
[![npm license](https://img.shields.io/npm/l/html-inlinify.svg)](https://www.npmjs.com/package/html-inlinify)
[![Travis](https://img.shields.io/travis/panosoft/html-inlinify.svg)](https://travis-ci.org/panosoft/html-inlinify)
[![David](https://img.shields.io/david/panosoft/html-inlinify.svg)](https://david-dm.org/panosoft/html-inlinify)
[![npm downloads](https://img.shields.io/npm/dm/html-inlinify.svg)](https://www.npmjs.com/package/html-inlinify)

## Installation

```sh
npm install html-inlinify
```

## Usage

This browserify transform statically evaluates [inline-html](https://github.com/panosoft/inline-html) expressions in order to embed local assets referenced in an HTML document and bundle the results.

Assuming we have the following `index.js`:

```js
var inlineHtml = require('inline-html');

inlineHtml('./index.html').then(function (html) {
  // ...
});
```

We can use browserify with the addition of this transform:

```sh
browserify -t hmtl-inlinify index.js > bundle.js
```

To create the following `bundle.js`:

```js
Promise.resolve('... html string with assets embedded ...').then(function (html) {
  // ...
});
```
