'use strict';

const convertFromUrl = require('./lib/convertFromUrl') 

module.exports = {
  convertFromUrl
}

// if run as cmd utility
if (typeof require !== 'undefined' && require.main === module) {
  if(process.argv.length < 3){
    console.log('What url to convert?')
    return
  }
  convertFromUrl(process.argv[2]).then(function (markdown) {
    console.log(markdown); //=> Markdown content of medium post
  });
}
