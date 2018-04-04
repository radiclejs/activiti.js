'use strict';

/*
 * @Author: yuzhe.xing
 * @Date: 2018-01-02 09:31:36
 * @Last Modified by: yuzhe.xing
 * @Last Modified time: 2018-01-16 15:07:26
 */

// const Koa = require('koa');
// const koaApp = new Koa();
// koaApp.listen(3000);

const Application = require('./framework').Application;

const app = new Application({
  baseDir: __dirname
});

app.ready(() => {
  app.listen(app.config.port);
});
