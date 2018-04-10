'use strict';

const Controller = require('egg-cooked').Controller;

class RepositoryController extends Controller {
  get SERVICE() {
    return this.ctx.service.repository;
  }

  async deploy() {
    const body = this.checkBodyInput({
      id: 'string',
      name: 'string',
      desc: {
        type: 'string',
        required: false
      },
      xml: 'string',
      svg: 'string'
    }, ['id', 'name', 'desc', 'xml', 'svg']);

    const result = await this.SERVICE.deploy(body);
    this.ctx.done({
      key: 'SUCCESS',
      data: result
    });
  }
}

module.exports = RepositoryController;
