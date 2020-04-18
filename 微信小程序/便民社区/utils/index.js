var request = require('./request.js');
var storage = require('./storage.js');
var utils = require('./util.js');

var exports = module.exports = {
  request: request.request,
  setStorage: storage.setStorage,
  getStorage: storage.getStorage,
  utils: utils
};