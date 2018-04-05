/**
 * https: //eslint.org/
 * https: //github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/es6.js
 * http : //eslint.cn/docs/rules/
 */

module.exports = {
  "extends": [
    "eslint-config-egg"
  ],
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "rules"  : {
    // 以下配置检查
    "array-bracket-spacing": ["error", "always"],   // 强制在[]内使用空格
    "object-curly-spacing" : ["error", "always"],   // 强制在{}使用一致的空格
    "indent"               : ["error", 2],          // 缩进
    "quotes"               : ["error","single"],    // 强制使用一致的单引号,
    "func-style": [2, "declaration", { "allowArrowFunctions": true }]
  }
};
