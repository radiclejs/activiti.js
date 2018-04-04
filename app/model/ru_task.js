'use strict';

/**@fileOverview （执行中实时任务）代办任务查询表 */
const { SUSPENSION_STATE } = require('../../lib/const');

module.exports = app => {
  const Sequelize = app.Sequelize;

  const RuTask = app.model.define('ru_task', {
    id: {
      type: Sequelize.CHAR,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    version: Sequelize.SMALLINT,
    type: Sequelize.CHAR,
    name: Sequelize.CHAR,
    description: Sequelize.TEXT,
    type: Sequelize.CHAR,
    parent_task_id: Sequelize.CHAR,
    task_def_key: Sequelize.CHAR,
    execution_id: Sequelize.CHAR,
    // 流程定义id
    proc_def_id: Sequelize.CHAR,
    // 流程实例ID
    proc_inst_id: Sequelize.CHAR,
    // 拥有者（一般情况下为空，只有在委托时才有值）
    owner: Sequelize.CHAR,
    // 签收人或委托人
    assignee: Sequelize.CHAR,
    // 代理团
    delegation: Sequelize.CHAR,
    priority: {
      type: Sequelize.SMALLINT,
      defaultValue: 50
    },
    // 到期时间
    duedate: Sequelize.DATE,
    suspension_state: {
      allowNull: false,
      type: Sequelize.ENUM,
      values: Object.values(SUSPENSION_STATE),
      defaultValue: SUSPENSION_STATE.ACTIVE
    },
  }, {
    timestamps: true,
    // freezeTableName: true
  });

  return RuTask;
};
