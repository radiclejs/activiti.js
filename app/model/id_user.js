'use strict';

const uuid = require('uuid');

/**@fileOverview 用户信息表 */

module.exports = app => {
  const Sequelize = app.Sequelize;
  const IdUser = app.model.define('id_user', {
    // 等于用户的邮箱前缀
    id: {
      type: Sequelize.CHAR,
      primaryKey: true
    },
    // 邮箱
    email: Sequelize.STRING,
    pwd: Sequelize.CHAR,
    // 部门名称
    department: Sequelize.STRING,
    first: Sequelize.CHAR,
    last: Sequelize.CHAR,
    nickname: Sequelize.CHAR,
    // 手机号
    mobile: Sequelize.CHAR,
    // 头像地址
    avatar: Sequelize.CHAR,
    // 是否可用
    enable: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true,
    // freezeTableName: true
  });

  return IdUser;
};
