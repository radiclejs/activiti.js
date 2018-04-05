'use strict';

/**@fileOverview 运行时流程执行实例, 核心，我的代办任务查询表 */


module.exports = app => {
  const Sequelize = app.Sequelize;

  const RuExecution = app.model.define('ru_execution', {
    id: {
      type: Sequelize.CHAR(64),
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    version: {
      type: Sequelize.SMALLINT,
      defaultValue: 1
    },
    // 业务主键ID
    business_key: Sequelize.CHAR(255),
    // 父节点实例ID
    parent_id: Sequelize.CHAR(64),
    // 流程定义id
    proc_def_id: Sequelize.CHAR(64),
    // 流程实例ID
    proc_inst_id: Sequelize.CHAR(64),
    // 根流程实例ID?
    root_proc_inst_id: Sequelize.CHAR(64),
    // ?
    super_exec: Sequelize.CHAR(64),
    // 节点实例ID即 ACT_HI_ACTINST中ID
    act_id: Sequelize.CHAR(255),
    // 是否激活状态
    is_active: Sequelize.BOOLEAN,
    // 是否并行状态
    is_concurrent: Sequelize.BOOLEAN,
    // ?
    is_scope: Sequelize.BOOLEAN,
    // ?
    is_event_scope: Sequelize.BOOLEAN,
    // ?
    is_mi_root: Sequelize.BOOLEAN,
    // 状态 1 激活 2 挂起
    suspension_state: Sequelize.TINYINT(4),
    // 缓存结束状态
    cached_ent_state: Sequelize.BOOLEAN,
    // 租户
    tenant_id: {
      allowNull: true,
      type: Sequelize.CHAR
    },
    name: Sequelize.CHAR,
    start_time: Sequelize.TIME,
    start_user_id: Sequelize.CHAR,
    lock_time: Sequelize.TIME,
    is_count_enabled: Sequelize.BOOLEAN,
    evt_subscr_count: Sequelize.SMALLINT,
    task_count: Sequelize.SMALLINT,
    job_count: Sequelize.SMALLINT,
    timer_job_count: Sequelize.SMALLINT,
    susp_job_count: Sequelize.SMALLINT,
    deadletter_job_count: Sequelize.SMALLINT,
    var_count: Sequelize.SMALLINT,
    id_link_count: Sequelize.SMALLINT
  }, {
    timestamps: true,
    // freezeTableName: true
  });

  return RuExecution;
};
