'use strict';

/*
 * @Author: yuzhe.xing
 * @Date: 2018-01-02 09:31:36
 * @Last Modified by: yuzhe.xing
 * @Last Modified time: 2018-01-16 15:04:46
 */

// const Koa = require('koa');
// const koaApp = new Koa();
// koaApp.listen(3001);

const Agent = require('./framework').Agent;

const agent = new Agent({
  baseDir: __dirname
});

agent.ready(() => {});
