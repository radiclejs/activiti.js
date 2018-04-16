/*
 * @Author: yuzhe.xing
 * @Date: 2018-01-18 15:09:47
 * @Last Modified by: yuzhe.xing
 * @Last Modified time: 2018-04-16 15:30:28
 */
'use strict';

const Controller = require('egg-cooked').Controller;

class IdUserController extends Controller {
  get SERVICE() {
    return this.ctx.service.idUser;
  }

  create() {
    const body = this.checkBodyInput({
      id: 'string',
      email: 'string',
      pwd: 'string',
      nickname: 'string'
    }, ['id', 'email', 'pwd', 'nickname'])

    super.create(body)
  }
}

module.exports = IdUserController;
