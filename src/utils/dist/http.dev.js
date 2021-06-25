"use strict";

// 通过 axios 处理请求
var axios = require('axios');

var _require = require('../utils/common'),
    githubUser = _require.githubUser;

axios.interceptors.response.use(function (res) {
  return res.data;
});
/**
 * 获取模板列表
 * @returns Promise
 */

function getRepoList() {
  return regeneratorRuntime.async(function getRepoList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", axios.get("https://api.github.com/users/".concat(githubUser, "/repos")));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  getRepoList: getRepoList
};