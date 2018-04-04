'use strict';

// const fs = require('fs');
// const path = require('path');

/**
 * The configuration of egg application, can be access by `app.config`
 * @class Config
 * @since 1.0.0
 */

 const REDIS_IP = '127.0.0.1';
 const MYSQL_IP = '127.0.0.1';

module.exports = appInfo => {

  const config = {
    port: 3000,
    keys: '',
    // api路由的前缀
    API_PATH_HEAD: '/api',
    // 是否开启登录验证
    isUsePassport: true
  };

  // add your config here
  config.middleware = [
    'oauth',
  ];

  config.jsonp = {
    csrf: true,
    whiteList: undefined
  };

  config.sequelize = {
    dialect: 'mysql',
    database: 'enginee',
    port: '3306',
    replication: {
      read:  { host: MYSQL_IP, username: 'root', password: 'root' },
      write: { host: MYSQL_IP, username: 'root', password: 'root' }
    },
    pool: {
      max: 1000
    }
  };

  config.redis = {
    agent: false,
    clients: {
      pub: {
        port: 6379,          // Redis port
        host: REDIS_IP,   // Redis host
        password: '',
        db: 0,
      },
      sub: {
        port: 6379,          // Redis port
        host: REDIS_IP,   // Redis host
        password: '',
        db: 0,
      }
    }
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
      '.html': 'nunjucks'
    },
  };

  config.cors = {
    credentials: true
  };

  config.onerror = {
    accepts(ctx) {
      if (ctx.path.indexOf(ctx.app.config.API_PATH_HEAD) > -1) {
        return 'json'
      }

      return 'html';
    }
  };

  // config.oauth2Server = {
  //   grants: [ 'password', 'client_credentials' ],
  // };

  return config;
};
