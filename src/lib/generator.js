const { getRepoList } = require('../utils/http')
const ora = require('ora')
const inquirer = require('inquirer')
const chalk = require('chalk') // 命令行美化工具
const util = require('util')
const path = require('path')
const downloadGitRepo = require('download-git-repo') // 不支持 Promise
const { githubUser } = require('../utils/common')

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  // 使用 ora 初始化，传入提示信息 message
  const spinner = ora(message);
  // 开始加载动画
  spinner.start();

  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result;
  } catch (error) {
    // 状态为修改为失败
    spinner.fail('请求失败，请重新请求...')
  }
}

class Generator {
  constructor(name, targetDir) {
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
    // 对 download-git-repo 进行 promise 化改造
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  // 获取用户选择的模板
  async getRepo() {
    // 1）从远程拉取模板数据
    const repoList = await wrapLoading(getRepoList, '拉取模板中...');
    if (!repoList) return;

    // 过滤我们需要的模板名称
    const repos = repoList.map(item => item.name);

    // 2）用户选择自己新下载的模板名称
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: '请选择一个模板来创建一个项目'
    })

    // 3）return 用户选择模板的名称
    return repo;
  }

  // 下载远程模板
  async download(repo) {

    // 1）拼接下载地址
    const requestUrl = `github:${githubUser}/${repo}`;

    // 2）调用下载方法
    await wrapLoading(
      this.downloadGitRepo, // 远程下载方法
      '下载模板中...', // 加载提示信息
      requestUrl, // 参数1: 下载地址
      path.resolve(process.cwd(), this.targetDir)) // 参数2: 创建位置
  }


  // 核心创建逻辑
  async create() {

    // 获取模板名称
    const repo = await this.getRepo()

    // 下载模板到目录
    await this.download(repo)

    console.log(chalk.green(`您选择了${repo}为模板来创建此项目`))

    // 模板使用提示
    console.log(`\r\n成功创建项目 ${chalk.cyan(this.name)}`)
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
    console.log('  npm run dev\r\n')





  }
}

module.exports = Generator;
