'use strict';
// const MYSQL_IP = '127.0.0.1';

module.exports = {
  isUsePassport: false,
  security: {
    domainWhiteList: [
      '127.0.0.1:8000',
      '127.0.0.1:8080'
    ],
    csrf: false,
  }
};
