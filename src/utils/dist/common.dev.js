"use strict";

var ora = require('ora'); // 命令行 loading 动效


var spawn = require('cross-spawn'); // 跨平台 shell 工具


var chalk = require('chalk'); // 命令行美化工具


var path = require('path');

var fs = require('fs-extra'); // 系统fs模块的扩展，提供了更多便利的 API，并继承了fs模块的 API


var inquirer = require('inquirer');

var githubUser = 'PENTONCOS'; // 判断目录是否存在

var isCatalogExit = function isCatalogExit(name, options) {
  var cwd, targetDir, _ref, action;

  return regeneratorRuntime.async(function isCatalogExit$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // 当前命令行选择的目录
          cwd = process.cwd(); // 需要创建的目录地址

          targetDir = path.join(cwd, name); // 目录是否已经存在？

          if (!fs.existsSync(targetDir)) {
            _context.next = 20;
            break;
          }

          if (!options.force) {
            _context.next = 8;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(fs.remove(targetDir));

        case 6:
          _context.next = 20;
          break;

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(inquirer.prompt([{
            name: 'action',
            type: 'list',
            message: '该目录下已存在相同名字的文件夹，是否选择覆盖',
            choices: [{
              name: '是',
              value: 'overwrite'
            }, {
              name: '否',
              value: false
            }]
          }]));

        case 10:
          _ref = _context.sent;
          action = _ref.action;

          if (action) {
            _context.next = 16;
            break;
          }

          return _context.abrupt("return");

        case 16:
          if (!(action === 'overwrite')) {
            _context.next = 20;
            break;
          }

          // 移除已存在的目录
          console.log("\r\n\u79FB\u9664\u4E2D...");
          _context.next = 20;
          return regeneratorRuntime.awrap(fs.remove(targetDir));

        case 20:
          return _context.abrupt("return", targetDir);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  });
}; // 定义需要安装的基础依赖


var baseDependencies = ['react', 'react-dom', 'react-router-dom', 'mobx-react']; // 安装基础依赖

var installDependent = function installDependent(dependencies) {
  var spinner, child;
  return regeneratorRuntime.async(function installDependent$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
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
          return _context2.stop();
      }
    }
  });
};

module.exports = {
  installDependent: installDependent,
  isCatalogExit: isCatalogExit,
  githubUser: githubUser
};