'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });

module.exports = exports = {};

exports.createItem = function(category, item) {
  if(!category) return Promise.reject(new Error(`Expecte category`));
  if(!item) return Promise.reject(new Error('Expected item'));
  
  let stringObj = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${category}/${item.id}.json`, stringObj)
  .then(() => item)
  .catch(err => Promise.reject(err));
}

exports.fetchItem = function(category, id) {
  if(!category) return Promise.reject(new Error(`Expecte category`));
  if(!id) return Promise.reject(new Error('Expected item'));

  return fs.readFileProm(`${__dirname}/../data/${category}/${id}.json`)
  .then(data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch (err) {
      return Promise.reject(err);
    }
  })
};

exports.deleteItem = function(category, id) {
  if(!category) return Promise.reject(new Error(`Expecte category`));
  if(!id) return Promise.reject(new Error('Expected item'));
  console.log(fs.unlinkProm)
  return fs.unlinkProm(`${__dirname}/../data/${category}/${id}.json`)
  .then(() => '')
  .catch(err => Promise.reject(err));

};