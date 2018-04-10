'use strict';

const Service = require('egg-cooked').Service;

class Re_deploymentService extends Service {
  get MODEL() {
    return this.ctx.model.ReDeployment
  }
}

module.exports = Re_deploymentService;
