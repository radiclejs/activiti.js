'use strict';

module.exports = {
  success(obj = {}) {
    this.body = Object.assign({
      status: 'ok',
      result: obj
    });
  },

  error(obj = { code: 'unkown'}) {
    this.body = obj
  },

  done(obj) {
    obj = obj ? obj : {};
    if (obj.code) {
      return this.error(obj)
    } else {
      return this.success(obj)
    }
  },

  throwError(msg, code, originError) {
    const { ERROR_CODE } = this.app;
    let error;
    if (originError instanceof Error) {
      error = originError;
      error.message = `${msg} ${error.message}`;
    } else {
      error = new Error(msg);
    }

    try {
      let strs = code.split('.');
      let realCode = ERROR_CODE;
      strs.forEach(key => {
        if (realCode[key]) {
          realCode = realCode[key];
        }
      })

      error.code = realCode;
      // 说明是主动抛出来的错误
      error.status = 200;
      // 设置为200会拦截默认的写日志操作
      this.logger.error(err);
    } catch(e) {
      error.code = error.code || code;
    }

    throw error;
  }
};
