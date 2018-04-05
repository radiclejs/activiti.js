/*
 * @Author: yuzhe.xing
 * @Date: 2018-01-18 15:09:47
 * @Last Modified by: yuzhe.xing
 * @Last Modified time: 2018-04-04 17:25:04
 */
'use strict';

const Controller = require('egg-cooked').Controller;

class IdUserController extends Controller {
  get SERVICE() {
    return this.ctx.service.idUser;
  }

  async findByAccount() {
    const account = this.checkInput({
      // 用户邮箱字段
      account: 'string'
    }, ['account']).account;
    const result = await this.SERVICE.findByAccount(account);

    this.ctx.done(result);
  }
}

module.exports = IdUserController;
