'use strict';

/**@fileOverview 运行时流程变量数据表 */
const { SUSPENSION_STATE } = require('../../lib/const');

module.exports = app => {
  const Sequelize = app.Sequelize;

  const RuVariable = app.model.define('ru_variable', {
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
    execution_id: Sequelize.CHAR,
    task_id: Sequelize.CHAR,
    bytearray_id: Sequelize.CHAR,
    // 流程实例ID
    proc_inst_id: Sequelize.CHAR,
    double: Sequelize.DOUBLE,
    long: Sequelize.INTEGER,
    text: Sequelize.TEXT,
    text2: Sequelize.TEXT
  }, {
    timestamps: true,
    // freezeTableName: true
  });

  return RuVariable;
};
