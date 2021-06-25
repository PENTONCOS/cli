#! /usr/bin/env node
"use strict";

var program = require('commander'); // 自定义命令行指令


var chalk = require('chalk'); // 命令行美化工具


var inquirer = require('inquirer'); // 命令行交互工具


var ora = require('ora'); // 命令行 loading 动效


var spawn = require('cross-spawn'); // 跨平台 shell 工具


var _require = require('../src/utils/common'),
    init = _require.init;

var packageConfig = require('../package.json');

program.version(packageConfig.version);
program.version(packageConfig.version, '-v, --version').command('create <name>').description('create a new project').action(init);
program.parse();