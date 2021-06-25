
const ora = require('ora'); // 命令行 loading 动效
const spawn = require('cross-spawn'); // 跨平台 shell 工具
const chalk = require('chalk') // 命令行美化工具
const path = require('path')
const fs = require('fs-extra') // 系统fs模块的扩展，提供了更多便利的 API，并继承了fs模块的 API
const inquirer = require('inquirer')

const githubUser = 'PENTONCOS';

// 判断目录是否存在
const isCatalogExit = async (name, options) => {
  // 当前命令行选择的目录
  const cwd = process.cwd();
  // 需要创建的目录地址
  const targetDir = path.join(cwd, name)
  // 目录是否已经存在？
  if (fs.existsSync(targetDir)) {

    // 是否为强制创建？
    if (options.force) {
      await fs.remove(targetDir)
    } else {
      // 询问用户是否确定要覆盖
      // 询问用户是否确定要覆盖
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: '该目录下已存在相同名字的文件夹，是否选择覆盖',
          choices: [
            {
              name: '是',
              value: 'overwrite'
            }, {
              name: '否',
              value: false
            }
          ]
        }
      ])

      if (!action) {
        return;
      } else if (action === 'overwrite') {
        // 移除已存在的目录
        console.log(`\r\n移除中...`)
        await fs.remove(targetDir)
      }
    }
  }
  return (targetDir)
}

// 定义需要安装的基础依赖
const baseDependencies = ['react', 'react-dom', 'react-router-dom', 'mobx-react'];

// 安装基础依赖
const installDependent = async (dependencies) => {

  // 开始加载动画
  const spinner = ora('开始安装依赖中...').start();

  spinner.color = 'red';
  spinner.text = '依赖安装中...';

  // 执行安装
  const child = spawn('npm', ['install', '-D'].concat(dependencies), {
    stdio: 'inherit'
  });

  // 监听执行结果
  child.on('close', function (code) {
    // 执行失败
    if (code !== 0) {
      console.log(chalk.red('在安装依赖的过程中，发生了意外！'));
      process.exit(1);
    }
    // 执行成功
    else {
      spinner.stop();
      spinner.succeed('依赖安装结束~');
    }
  })
}


module.exports = {
  installDependent,
  isCatalogExit,
  githubUser
}