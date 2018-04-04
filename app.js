'use strict';

const debug = require('debug')('app.js');
const assert = require('assert');

// app.js
const LocalStrategy = require('passport-local').Strategy;

function usePassport(app) {
  // 挂载 strategy
  app.passport.use(new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
  }, (req, email, password, done) => {

    const user = {
      provider: 'local',
      email,
      password,
    };
    debug('%s %s get user: %j', req.method, req.url, user);
    app.passport.doVerify(req, user, done);
  }));

  // 处理用户信息
  app.passport.verify(async (ctx, user) => {
    // 检查用户
    assert(user.email, 'email should exists');

    if (user.email === 'host') {
      return {
        name: 'host',
        role: 'host'
      }
    }

    if (user.email === 'pc') {
      return {
        name: 'pc',
        role: 'pc'
      }
    }

    const existsUser = app.getCacheEmployees({ email_prefix: user.email });

    if (existsUser) {
      return existsUser;
    }
  });
  app.passport.serializeUser(async (ctx, user) => {
    return user
  });
  app.passport.deserializeUser(async (ctx, user) => {
    return user
  });
}

module.exports = app => {
  // if (app.config.isUsePassport) {
  //   usePassport(app);
  // }
};
