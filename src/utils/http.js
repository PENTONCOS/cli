// 通过 axios 处理请求
const axios = require('axios')
const { githubUser } = require('../utils/common')

axios.interceptors.response.use(res => {
  return res.data;
})

/**
 * 获取模板列表
 * @returns Promise
 */
async function getRepoList() {
  // 获取PENTONCOS下所有repo
  return axios.get(`https://api.github.com/users/${githubUser}/repos`)
}

module.exports = {
  getRepoList
}