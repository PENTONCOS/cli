#! /usr/bin/env node

const program = require('commander') // 自定义命令行指令
const chalk = require('chalk') // 命令行美化工具
const inquirer = require('inquirer') // 命令行交互工具
const ora = require('ora'); // 命令行 loading 动效
const spawn = require('cross-spawn'); // 跨平台 shell 工具

const { init } = require('../src/utils/common')

const packageConfig = require('../package.json');

program.version(packageConfig.version);

program
  .version(packageConfig.version, '-v, --version')
  .command('create <name>')
  .description('create a new project')
  .action(init)

program.parse()
