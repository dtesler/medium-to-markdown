'use strict';

const request = require('request');
const cheerio = require('cheerio');
const TurndownService = require('turndown')
const gfm = require('turndown-plugin-gfm').gfm

const turndownService = new TurndownService()
turndownService.use(gfm)

// following block adapted from https://github.com/domchristie/turndown/blob/61c2748c99fc53699896c1449f953ea492311c5b/src/commonmark-rules.js#L131
turndownService.addRule('mediumInlineLink', {
  filter: function (node, options) {
    return (
      options.linkStyle === 'inlined' &&
      node.nodeName === 'A' &&
      node.getAttribute('href')
    )
  },

  replacement: function (content, node) {
    var href = node.getAttribute('href')

    // following code added in to handle medium relative urls
    // otherwise the link to article "foo" in the new website would go to
    // https://newwebsite.com/@username/foo-a16a6fcf49c7 which doesn't exist
    if(href.startsWith('/')){
      href = "https://medium.com" + href
    }

    var title = node.title ? ' "' + node.title + '"' : ''
    return '[' + content + '](' + href + title + ')'
  }
})

// Medium has these weird hidden images that are in the html and get rendered
// by turndown. We filter these out.
turndownService.addRule('noHiddenImages', {
  filter: function (node, options) {
    return (
      node.nodeName === 'IMG' &&
      node.getAttribute('src') &&
      node.getAttribute('src').endsWith('?q=20')
    )
  },

  replacement: function () {
    return ''
  }
})

// todo: filter out profile header
// (right below title, the div with author profile pic and name and time to read article)
// unfortunately Medium uses randomly generated CSS properties which makes it hard to
// identify the header and strip it out. For example, I could strip the div with
// the class "eq" but the next time medium updated their CSS the div would have
// a different class name and the filter wouldn't work anymore

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
