'use strict';

/**@fileOverview 运行时事件 */


module.exports = app => {
  const Sequelize = app.Sequelize;

  const RuEventSubscr = app.model.define('ru_event_subscr', {
    id: {
      type: Sequelize.CHAR,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    // 事件名称
    name: Sequelize.CHAR,
    // 事件类型
    category: Sequelize.CHAR,
    // 流程执行ID
    execution_id: Sequelize.CHAR,
    // 流程实例ID
    proc_inst_id: Sequelize.CHAR,
    // 活动ID
    activity_id: Sequelize.CHAR,
    // 配置信息
    configuration: Sequelize.CHAR,
    // 流程定义id
    proc_def_id: Sequelize.CHAR
  }, {
    timestamps: true,
    // freezeTableName: true
  });

  return RuEventSubscr;
};
