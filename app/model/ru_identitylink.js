'use strict';

/**@fileOverview 运行时流程执行实例, 核心，我的代办任务查询表 */
const { IDENTITY_USER_TYPE } = require('../../lib/const');

module.exports = app => {
  const Sequelize = app.Sequelize;

  const RuIdentitylink = app.model.define('ru_identitylink', {
    id: {
      type: Sequelize.CHAR,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    version: {
      type: Sequelize.SMALLINT,
      defaultValue: 1
    },
    // 用户组id
    group_id: Sequelize.CHAR,
    // 用户组 类型
    type: {
      allowNull: false,
      type: Sequelize.ENUM,
      values: Object.values(IDENTITY_USER_TYPE)
    },
    user_id: Sequelize.CHAR,
    task_id: Sequelize.CHAR,
    // 流程定义id
    proc_def_id: Sequelize.CHAR,
    // 流程实例ID
    proc_inst_id: Sequelize.CHAR
  }, {
    timestamps: true,
    // freezeTableName: true
  });

  return RuIdentitylink;
};
