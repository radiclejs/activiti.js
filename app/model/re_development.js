'use strict';

/**@fileOverview 部署信息表, 用来存储部署时需要持久化保存下来的信息 */

module.exports = app => {
  const Sequelize = app.Sequelize;

  const ReDevelopment = app.model.define('re_development', {
    id: {
      type: Sequelize.CHAR,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    // 部署包的名称
    name: Sequelize.CHAR,
    // 类型
    category: Sequelize.CHAR,
    // 关键字
    key: Sequelize.CHAR,
    // 租户, 多租户通常是在软件需要为多个不同组织服务时产生的概念
    tenant_id: Sequelize.CHAR,
    // 部署时间
    develop_time: {
      type: Sequelize.TIME,
      defaultValue: Sequelize.NOW
    },
    enginee_version: Sequelize.CHAR
  }, {
    timestamps: true,
    // freezeTableName: true
  });

  return ReDevelopment;
};
