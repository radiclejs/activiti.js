'use strict';

const Controller = require('egg-cooked').Controller;

class Id_groupController extends Controller {
  get SERVICE() {
    return this.ctx.service.idGroup;
  }
}

module.exports = Id_groupController;
