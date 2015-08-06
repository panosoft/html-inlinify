# html-inlinify

Inline local assets referenced in an HTML document.

[![npm](https://img.shields.io/npm/v/html-inlinify.svg)]()
[![npm](https://img.shields.io/npm/l/html-inlinify.svg)]()
[![Travis](https://img.shields.io/travis/panosoft/html-inlinify.svg)]()
[![David](https://img.shields.io/david/panosoft/html-inlinify.svg)]()
[![npm](https://img.shields.io/npm/dm/html-inlinify.svg)]()

# Installation

    npm install html-inlinify

# Usage

This browserify transform statically evaluates [inline-html](https://github.com/panosoft/inline-html) expressions to inline local assets referenced in an HTML document and bundle the results.

This:

    browserify -t hmtl-inlinify index.js > bundle.js

Turns this `index.js`:

    var inlineHtml = require('inline-html');
    inlineHtml('./index.html').then(function (html) {
      ...
    });

Into this `bundle.js`:

    Promise.resolve('data:...').then(function (html) {
      ...
    });
