'use strict';

const Service = require('egg-cooked').Service;

class Re_procdefService extends Service {
  get MODEL() {
    return this.ctx.model.ReProcdef
  }
}

module.exports = Re_procdefService;
