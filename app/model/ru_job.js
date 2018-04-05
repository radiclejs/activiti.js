'use strict';

/**@fileOverview 运行时定时任务数据表 */
const { IDENTITY_USER_TYPE } = require('../../lib/const');

module.exports = app => {
  const Sequelize = app.Sequelize;

  const RuJob = app.model.define('ru_job', {
    id: {
      type: Sequelize.CHAR,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    version: {
      type: Sequelize.SMALLINT,
      defaultValue: 1
    },
    type: Sequelize.CHAR,
    // 锁定释放时间
    lock_exp_time: Sequelize.TIME,
    // 挂起者
    lock_owner: Sequelize.CHAR,
    is_exclusive: Sequelize.BOOLEAN,
    execution_id: Sequelize.CHAR,
    // 流程定义id
    proc_def_id: Sequelize.CHAR,
    // 流程实例ID
    proc_inst_id: Sequelize.CHAR,
    retries: Sequelize.SMALLINT,
    exception_stack_id:  Sequelize.CHAR,
    exception_msg: Sequelize.TEXT,
    // 到期时间
    duedate: Sequelize.TIME,
    repeat: Sequelize.CHAR,
    handler_type: Sequelize.CHAR,
    handler_cfg: Sequelize.CHAR
  }, {
    timestamps: true,
    // freezeTableName: true
  });

  return RuJob;
};
