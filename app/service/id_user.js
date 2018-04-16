'use strict';

const Service = require('egg-cooked').Service;

class Id_userService extends Service {
  get MODEL() {
    return this.ctx.model.IdUser;
  }
}

module.exports = Id_userService;
