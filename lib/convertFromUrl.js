'use strict';

const request = require('request');
const cheerio = require('cheerio');
const TurndownService = require('turndown')
const gfm = require('turndown-plugin-gfm').gfm

const turndownService = new TurndownService()
turndownService.use(gfm)

function convertFromUrl(url) {
  return new Promise(function(resolve, reject) {
    request({
      uri: url,
      method: 'GET'
    }, function (err, httpResponse, body) {

      if (err)
        return reject(err);
      
      let $ = cheerio.load(body);
      let html = $('article').html() || '';
      let markdown = turndownService.turndown(html);

      resolve(markdown);

    });
  });
}

module.exports = convertFromUrl;
