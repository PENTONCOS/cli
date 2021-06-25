
const ora = require('ora'); // 命令行 loading 动效
const spawn = require('cross-spawn'); // 跨平台 shell 工具
const chalk = require('chalk') // 命令行美化工具


// 定义需要安装的基础依赖
const baseDependencies = ['react', 'react-dom', 'react-router-dom', 'mobx-react'];

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

const init = async (name) => {
  console.log("project name is " + chalk.bgMagenta.dim(name))

  // 安装基础依赖
  await installDependent(baseDependencies);

  // console.log(chalk.cyan('依赖安装结束~'))
}

module.exports = {
  init
}