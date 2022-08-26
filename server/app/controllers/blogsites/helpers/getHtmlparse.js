const { buildErrObject } = require('../../../middleware/utils')
const Parser = require('rss-parser');
const jsdom = require("jsdom");
const fs = require('fs');
const { JSDOM } = jsdom;
const axios = require("axios");
const { decode } = require('iconv-lite');
const charset = require('charset');

const isRSS = (node) => {
  // Return false if there is no title attribute.
  if(typeof node.title === 'undefined') { return false }

  return (node.title.includes('RSS') || node.title.includes('rss'));
};
const isRSSType = (node) => {
  // Return false if there is no title attribute.
  if(typeof node.type === 'undefined') { return false }

  return node.type.includes('application/rss+xml');
};
const isIcon = (node) => {
  // Return false if there is no title attribute.
  if(typeof node.rel === 'undefined') { return false }

  return (node.rel.includes('icon') || node.rel.includes('ICON'));
};
/**
 * Checks if a blogsite already exists in database
 * @param {string} url - url of item
 */
const getHtmlparse = (url = '') => {
  return new Promise((resolve, reject) => {

    axios.request({
      method: 'GET',
      url: url,
      responseType: 'arraybuffer',
      responseEncoding: 'binary'
    })
    .then(function (response) {
      const cs = charset(response.headers['content-type']);
      const resData = decode(response.data, cs);

      const dom = new JSDOM(resData);
      let siteTitle = dom.window.document.querySelector('title').textContent;
      let nodeList = [...dom.window.document.querySelectorAll('link')];
      let RSS_INFO = {
        'title': siteTitle,
        'RSS_link': '',
        'icon': '',
        'arrRSSItems': []
      };

      nodeList.filter(isRSS).forEach(node => {
        RSS_INFO.RSS_link = node.href;
      });

      nodeList.filter(isIcon).forEach(node => {
        RSS_INFO.icon = node.href;
      });

      if(RSS_INFO.RSS_link === ''){
        nodeList.filter(isRSSType).forEach(node => {
          RSS_INFO.RSS_link = node.href;
        });
      }

      if(RSS_INFO.RSS_link === ''){
        return reject(buildErrObject(600, "URLに含まれているフィードリンクが正しくありません。"))
      }

      if(RSS_INFO.RSS_link.startsWith("/")){
        if(url.endsWith("/"))
        {
          RSS_INFO.RSS_link = url + RSS_INFO.RSS_link.slice(1, RSS_INFO.RSS_link.length)
        } else {
          RSS_INFO.RSS_link = url + RSS_INFO.RSS_link
        }
      } else if(RSS_INFO.RSS_link.startsWith("i")){
        if(url.endsWith("/"))
        {
          RSS_INFO.RSS_link = url + RSS_INFO.RSS_link
        } else {
          RSS_INFO.RSS_link = url + '/' + RSS_INFO.RSS_link
        }
      }

      if(RSS_INFO.icon.startsWith("/")){
        RSS_INFO.icon = url + RSS_INFO.icon
      }

      console.log(RSS_INFO.RSS_link)

      let parser = new Parser();
      let arrRSSItems = [];
      (async () => {
        let feed = await parser.parseURL(RSS_INFO.RSS_link);

        feed.items.forEach((item) => {
          let objItem = {
            'title': item.title,
            'link': item.link,
            'blog_date': item.date?item.date:item.isoDate
          }
          arrRSSItems.push(objItem);
        });
        RSS_INFO.arrRSSItems = arrRSSItems;

        resolve(RSS_INFO)
      })();
    })
    .catch(err => {
      console.log('err - ', err);
      return reject(buildErrObject(422, "URLに含まれているフィードリンクが正しくありません。"))
    });
  })
}

module.exports = { getHtmlparse }
