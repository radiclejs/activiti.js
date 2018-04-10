'use strict';

// const fs = require('fs');
// const path = require('path');

/**
 * The configuration of egg application, can be access by `app.config`
 * @class Config
 * @since 1.0.0
 */

//  const REDIS_IP = '127.0.0.1';
//  const MYSQL_IP = '127.0.0.1';

module.exports = appInfo => {

  const config = {
    port: 3000,
    clusterClient: {
      workers: 1
    },
  };

  return config;
};
