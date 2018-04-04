/*
 * @Author: yuzhe.xing
 * @Date: 2018-01-24 10:29:50
 * @Last Modified by: yuzhe.xing
 * @Last Modified time: 2018-02-01 20:38:23
 */

'use strict';

module.exports = options => {
  return async function oauth(ctx, next) {
    const passPaths = [
      '/login',
      '/api/login',
      '/api/logout',
      '/api/authFailCallback',
      // @todo 压力测试用, 测完删掉
      // '/api/lottery/enter',
      // '/api/employees/2/scratch_nums/24',
      // '/api/employees/2/scratch_nums/24/scratch'
    ];

    if (!ctx.app.config.isUsePassport) {
      await next();
    } else if (passPaths.indexOf(ctx.path) > -1) {
      await next();
    } else if (ctx.isAuthenticated()) {
      await next();
    } else {
      ctx.body = {
        code: '-1',
        message: '尚未登录'
      }
    }
  };
};
