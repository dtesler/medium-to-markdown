'use strict';

const Promise = require('bluebird');
const request = require('request');
const cheerio = require('cheerio');
const toMarkdown = require('to-markdown');

const converters = require('./mdConverters');

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
      let markdown = toMarkdown(html, { gfm: true, converters: converters });

      resolve(markdown);

    });
  });
}

module.exports = convertFromUrl;
