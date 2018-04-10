'use strict';

const Service = require('egg-cooked').Service;

class Id_userService extends Service {
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

module.exports = Id_userService;
