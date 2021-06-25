#! /usr/bin/env node
"use strict";

var program = require('commander'); // 自定义命令行指令


var chalk = require('chalk'); // 命令行美化工具


var inquirer = require('inquirer'); // 命令行交互工具


var ora = require('ora'); // 命令行 loading 动效


var spawn = require('cross-spawn'); // 跨平台 shell 工具


var figlet = require('figlet'); // 控制台打印 logo


var _require = require('../src/lib/init'),
    init = _require.init;

var packageConfig = require('../package.json');

program.version(packageConfig.version);
program.command('create <name>').description(chalk.blue('新建一个项目')) // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
.option('-f, --force', 'overwrite target directory if it exist').action(init);
program.version(packageConfig.version, '-v, --version').usage('<command> [option]');
program.on('--help', function () {
  // 使用 figlet 绘制 Logo
  console.log('\r\n' + figlet.textSync('jpd', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 200,
    whitespaceBreak: true
  }));
}); // 解析用户执行命令传入参数

program.parse(process.argv);