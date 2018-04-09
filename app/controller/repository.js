'use strict';

const Controller = require('egg-cooked').Controller;

class RepositoryController extends Controller {
  get SERVICE() {
    return this.ctx.service.repository;
  }

  async deploy(body) {
    const body = this.checkBodyInput({
      id: 'string',
      name: 'string',
      source: 'string'
    });

    const result = await this.SERVICE.deploy(body);
    this.done(result);
  }
}

module.exports = RepositoryController;
