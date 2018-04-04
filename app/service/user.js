/*
 * @Author: yuzhe.xing
 * @Date: 2018-01-18 11:46:02
 * @Last Modified by: yuzhe.xing
 * @Last Modified time: 2018-04-04 17:51:18
 */
'use strict';

const Service = require('./base');

class IdUser extends Service {
  get MODEL() {
    return this.ctx.model.IdUser;
  }

  async findByAccount(account) {
    return this.findOne({
      where: {
        account
      }
    });
  }
}

module.exports = IdUser;
