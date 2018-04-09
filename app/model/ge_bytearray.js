'use strict';

/**@fileOverview 通用表, 用来保存部署文件的大文本数据 */

module.exports = app => {
  const Sequelize = app.Sequelize;

  const GeByteArray = app.model.define('ge_bytearray', {
    id: {
      type: Sequelize.CHAR,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    // 部署的文件名称
    name: Sequelize.CHAR,
    // 版本号
    version: {
      type: Sequelize.SMALLINT,
      defaultValue: 1
    },
    // 部署的id, 来自于父表ACT_RE_DEPLOYMENT的主键
    deployment_id: Sequelize.CHAR,
    // 大文本类型，存储文本字节流
    bytes: Sequelize.BLOB,
    // 是否引擎生成 0 为用户生成, 1为引擎生成
    generated: Sequelize.BOOLEAN
  }, {
    timestamps: true,
    // freezeTableName: true
  });

  return GeByteArray;
};
