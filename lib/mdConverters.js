'use strict';

const converters = [
  {
    filter: 'section',
    replacement: function(content) {
      return content;
    }
  },
  {
    filter: 'div',
    replacement: function(content) {
      return content;
    }
  },
  {
    filter: 'figure',
    replacement: function(content) {
      return content;
    }
  },
  {
    filter: 'figcaption',
    replacement: function(content) {
      return content;
    }
  }
];

module.exports = converters
