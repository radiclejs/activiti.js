'use strict';

const Service = require('egg-cooked').Service;

class Ge_propertyService extends Service {
  get MODEL() {
    return this.ctx.model.GeProperty
  }
}

module.exports = Ge_propertyService;
