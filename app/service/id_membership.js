'use strict';

const Service = require('egg-cooked').Service;

class Id_membershipService extends Service {
  get MODEL() {
    return this.ctx.model.IdMembership;
  }
}

module.exports = Id_membershipService;
