"use strict";

var ora = require('ora'); // 命令行 loading 动效


var spawn = require('cross-spawn'); // 跨平台 shell 工具


var chalk = require('chalk'); // 命令行美化工具
// 定义需要安装的基础依赖


var baseDependencies = ['react', 'react-dom', 'react-router-dom', 'mobx-react'];

var installDependent = function installDependent(dependencies) {
  var spinner, child;
  return regeneratorRuntime.async(function installDependent$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // 开始加载动画
          spinner = ora('开始安装依赖中...').start();
          spinner.color = 'red';
          spinner.text = '依赖安装中...'; // 执行安装

          child = spawn('npm', ['install', '-D'].concat(dependencies), {
            stdio: 'inherit'
          }); // 监听执行结果

          child.on('close', function (code) {
            // 执行失败
            if (code !== 0) {
              console.log(chalk.red('在安装依赖的过程中，发生了意外！'));
              process.exit(1);
            } // 执行成功
            else {
                spinner.stop();
                spinner.succeed('依赖安装结束~');
              }
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var init = function init(name) {
  return regeneratorRuntime.async(function init$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log("project name is " + chalk.bgMagenta.dim(name)); // 安装基础依赖

          _context2.next = 3;
          return regeneratorRuntime.awrap(installDependent(baseDependencies));

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports = {
  init: init
};