const chalk = require('chalk') // 命令行美化工具
const Generator = require('./generator')

const { installDependent, isCatalogExit } = require('../utils/common')

const init = async (name, option) => {

  console.log("\r\n项目的名称是：" + chalk.bgMagenta.dim(name) + "\r\n")

  const targetDir = await isCatalogExit(name, option);

  // console.log('targetDir', targetDir)
  // await installDependent(baseDependencies);

  // 创建项目
  const generator = new Generator(name, targetDir);

  // 开始创建项目
  generator.create()

}

module.exports = {
  init
}