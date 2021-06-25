"use strict";

var chalk = require('chalk'); // 命令行美化工具


var Generator = require('./generator');

var _require = require('../utils/common'),
    installDependent = _require.installDependent,
    isCatalogExit = _require.isCatalogExit;

var init = function init(name, option) {
  var targetDir, generator;
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("\r\n项目的名称是：" + chalk.bgMagenta.dim(name) + "\r\n");
          _context.next = 3;
          return regeneratorRuntime.awrap(isCatalogExit(name, option));

        case 3:
          targetDir = _context.sent;
          // console.log('targetDir', targetDir)
          // await installDependent(baseDependencies);
          // 创建项目
          generator = new Generator(name, targetDir); // 开始创建项目

          generator.create();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  init: init
};