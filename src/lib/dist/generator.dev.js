"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/http'),
    getRepoList = _require.getRepoList;

var ora = require('ora');

var inquirer = require('inquirer');

var chalk = require('chalk'); // 命令行美化工具


var util = require('util');

var path = require('path');

var downloadGitRepo = require('download-git-repo'); // 不支持 Promise


var _require2 = require('../utils/common'),
    githubUser = _require2.githubUser; // 添加加载动画


function wrapLoading(fn, message) {
  var spinner,
      _len,
      args,
      _key,
      result,
      _args = arguments;

  return regeneratorRuntime.async(function wrapLoading$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // 使用 ora 初始化，传入提示信息 message
          spinner = ora(message); // 开始加载动画

          spinner.start();
          _context.prev = 2;

          for (_len = _args.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = _args[_key];
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(fn.apply(void 0, args));

        case 6:
          result = _context.sent;
          // 状态为修改为成功
          spinner.succeed();
          return _context.abrupt("return", result);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](2);
          // 状态为修改为失败
          spinner.fail('请求失败，请重新请求...');

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 11]]);
}

var Generator =
/*#__PURE__*/
function () {
  function Generator(name, targetDir) {
    _classCallCheck(this, Generator);

    // 目录名称
    this.name = name; // 创建位置

    this.targetDir = targetDir; // 对 download-git-repo 进行 promise 化改造

    this.downloadGitRepo = util.promisify(downloadGitRepo);
  } // 获取用户选择的模板


  _createClass(Generator, [{
    key: "getRepo",
    value: function getRepo() {
      var repoList, repos, _ref, repo;

      return regeneratorRuntime.async(function getRepo$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(wrapLoading(getRepoList, '拉取模板中...'));

            case 2:
              repoList = _context2.sent;

              if (repoList) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return");

            case 5:
              // 过滤我们需要的模板名称
              repos = repoList.map(function (item) {
                return item.name;
              }); // 2）用户选择自己新下载的模板名称

              _context2.next = 8;
              return regeneratorRuntime.awrap(inquirer.prompt({
                name: 'repo',
                type: 'list',
                choices: repos,
                message: '请选择一个模板来创建一个项目'
              }));

            case 8:
              _ref = _context2.sent;
              repo = _ref.repo;
              return _context2.abrupt("return", repo);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      });
    } // 下载远程模板

  }, {
    key: "download",
    value: function download(repo) {
      var requestUrl;
      return regeneratorRuntime.async(function download$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // 1）拼接下载地址
              requestUrl = "github:".concat(githubUser, "/").concat(repo); // 2）调用下载方法

              _context3.next = 3;
              return regeneratorRuntime.awrap(wrapLoading(this.downloadGitRepo, // 远程下载方法
              '下载模板中...', // 加载提示信息
              requestUrl, // 参数1: 下载地址
              path.resolve(process.cwd(), this.targetDir)));

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    } // 核心创建逻辑

  }, {
    key: "create",
    value: function create() {
      var repo;
      return regeneratorRuntime.async(function create$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.getRepo());

            case 2:
              repo = _context4.sent;
              _context4.next = 5;
              return regeneratorRuntime.awrap(this.download(repo));

            case 5:
              console.log(chalk.green("\u60A8\u9009\u62E9\u4E86".concat(repo, "\u4E3A\u6A21\u677F\u6765\u521B\u5EFA\u6B64\u9879\u76EE"))); // 模板使用提示

              console.log("\r\n\u6210\u529F\u521B\u5EFA\u9879\u76EE ".concat(chalk.cyan(this.name)));
              console.log("\r\n  cd ".concat(chalk.cyan(this.name)));
              console.log('  npm run dev\r\n');

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Generator;
}();

module.exports = Generator;