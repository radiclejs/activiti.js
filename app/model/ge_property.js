'use strict';

/**@fileOverview 通用表, 用来引擎级别级别数据 */

module.exports = app => {
  const Sequelize = app.Sequelize;

  const GeProperty = app.model.define('ge_property', {
    name: Sequelize.CHAR,
    value: Sequelize.TEXT,
    // 版本号
    version: Sequelize.SMALLINT
  }, {
    timestamps: true,
    // freezeTableName: true
  });

  return GeProperty;
};
