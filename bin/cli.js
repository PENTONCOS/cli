#! /usr/bin/env node

const program = require('commander') // 自定义命令行指令
const chalk = require('chalk') // 命令行美化工具
const inquirer = require('inquirer') // 命令行交互工具
const ora = require('ora'); // 命令行 loading 动效
const spawn = require('cross-spawn'); // 跨平台 shell 工具
const figlet = require('figlet'); // 控制台打印 logo

const { init } = require('../src/lib/init')

const packageConfig = require('../package.json');

program.version(packageConfig.version);

program
  .command('create <name>')
  .description(chalk.blue('新建一个项目'))
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action(init)

program
  .version(packageConfig.version, '-v, --version')
  .usage('<command> [option]')

program
  .on('--help', () => {
    // 使用 figlet 绘制 Logo
    console.log('\r\n' + figlet.textSync('jpd', {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 200,
      whitespaceBreak: true
    }));
  })

// 解析用户执行命令传入参数
program.parse(process.argv)
