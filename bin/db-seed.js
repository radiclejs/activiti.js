'use strict';

// const Application = require('egg').Application;
const Application = require('../framework').Application;
const path = require('path');

const app = new Application({
  baseDir: path.resolve(__dirname, '../')
});

app.ready(async () => {
  await app.TheCreation();
  app.close();
});
