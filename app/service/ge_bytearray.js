'use strict';

const Service = require('egg-cooked').Service;

class Ge_bytearrayService extends Service {
  get MODEL() {
    return this.ctx.model.GeBytearray
  }
}

module.exports = Ge_bytearrayService;
