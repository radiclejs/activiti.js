'use strict';

const uuid = require('uuid');

/**@fileOverview 用户信息表 */

module.exports = app => {
  const Sequelize = app.Sequelize;
  const IdUser = app.model.define('id_user', {
    id: {
      type: Sequelize.CHAR,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    version: {
      type: Sequelize.SMALLINT,
      defaultValue: 1
    },
    // 邮箱前缀
    email: Sequelize.STRING,
    account: Sequelize.CHAR,
    pwd: Sequelize.CHAR,
    // 部门名称
    department_name: Sequelize.STRING,
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
