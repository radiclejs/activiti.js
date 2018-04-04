'use strict';
const FRONT_IP = '127.0.0.1:8080';
const MYSQL_IP = '127.0.0.1';

module.exports = {
  isUsePassport: false,
  security: {
    domainWhiteList: [FRONT_IP],
    csrf: false,
  },
  sequelize: {
    dialect: 'mysql',
    database: 'enginee',
    host: MYSQL_IP,
    port: '3306',
    username: 'root',
    password: 'root'
  }
};
