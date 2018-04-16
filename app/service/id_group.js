'use strict';

const Service = require('egg-cooked').Service;

class Id_groupService extends Service {
  get MODEL() {
    return this.ctx.model.IdGroup;
  }
}

module.exports = Id_groupService;
