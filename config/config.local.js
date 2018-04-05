'use strict';
const FRONT_IP = '127.0.0.1:8000';
// const MYSQL_IP = '127.0.0.1';

module.exports = {
  isUsePassport: false,
  security: {
    domainWhiteList: [FRONT_IP],
    csrf: false,
  }
};
