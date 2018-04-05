'use strict';

/**@fileOverview 流程设计模型表, 创建流程的设计模型时，保存在该数据表中 */

module.exports = app => {
  const Sequelize = app.Sequelize;

  const ReModel = app.model.define('re_model', {
    id: {
      type: Sequelize.CHAR,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    // 模型的名称：比如：贷款审批
    name: Sequelize.CHAR,
    // 类型，用户自己对流程模型的分类
    category: Sequelize.CHAR,
    // 模型的关键字，流程引擎用到。比如：FTOA_SWGL
    key: Sequelize.CHAR,
    // 版本号
    version: {
      type: Sequelize.SMALLINT,
      defaultValue: 1
    },
    // 数据源信息, 以json格式保存流程定义的信息, 比如：{"name":"FTOA_SWGL","revision":1,"description":"丰台财政局OA，收文管理流程"}
    meta_info: Sequelize.TEXT,
    development_id: Sequelize.CHAR,
    // 是 ACT_GE_BYTEARRAY 表中的ID_值
    editor_source_value_id: Sequelize.CHAR,
    // 是 ACT_GE_BYTEARRAY 表中的ID_值
    editor_source_extra_value_id: Sequelize.CHAR,
    // 租户
    tenant_id: {
      allowNull: true,
      type: Sequelize.CHAR
    },
  }, {
    timestamps: true,
    // freezeTableName: true
  });

  return ReModel;
};
