/**
 * 核心类库入口
 *
 * @type {string[]}
 */

const allModules = ['config', 'cookie', 'console', 'env', 'filters', 'helpers', 'mixin', 'rem', 'requestPhp', 'requestJava', 'messageBridge'];

require('./components');

/**
 * 导入并初始化 核心类库
 *
 * @param rules
 */
const reolve = function (rules) {

  let modulesToRequire = [];

  if (rules.include) {
    modulesToRequire = allModules.filter((item) => {
      return rules.include.indexOf(item) !== -1;
    });
  } else {
    modulesToRequire = allModules;
  }

  if (rules.exclude) {
    modulesToRequire = modulesToRequire.filter((item) => {
      return rules.exclude.indexOf(item) == -1
    });
  }

  for (let item of modulesToRequire) {
    let module = require(`./${item}`);

    if (!module.init) {
      continue;
    }

    if (rules.options && rules.options[item]) {
      module.init(rules.options[item]);
      continue;
    }

    module.init()
  }
}

/**
 * 导入 规则内 包含的 module
 *
 * @param modules
 */
const include = function (modules) {
  if (modules === undefined) {
    return;
  }

  if (typeof modules === 'string' && modules === '*') {
    modules = modules === '*'? allModules: [modules];
  }

  reolve({
    include: modules
  });
}

/**
 * 导入 除规则内 以外的 module
 *
 * @param modules
 */
const exclude = function (modules) {
  if (modules === undefined) {
    modules = allModules;
  }

  if (typeof modules === 'string' && modules === '*') {
    modules = modules === '*'? allModules: [modules];
  }
  reolve({
    exclude: modules
  });
}

/**
 * 初始化入口
 *
 * @param modules
 * @returns {undefined}
 */
let init = function (modules) {

  if (modules === undefined) {
    return include('*');
  }
  include(Array.prototype.slice.call(arguments, 0));
}

module.exports = init;
module.exports.include = include;
module.exports.exclude = exclude;
