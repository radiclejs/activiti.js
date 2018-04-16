'use strict';

const uuid = require('uuid');

/**@fileOverview 用户信息表 */

module.exports = app => {
  const Sequelize = app.Sequelize;
  const IdGroup = app.model.define('id_group', {
    // 职务类型名称(例: manager/market/sales)
    id: {
      type: Sequelize.CHAR,
      primaryKey: true
    },
    // 职务类型名称中文(例: 经理/市场/销售)
    name: Sequelize.CHAR,
    // 引擎执行类型(例: assignment/security)
    type: Sequelize.CHAR,
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

  return IdGroup;
};
