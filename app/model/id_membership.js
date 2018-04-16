'use strict';

const uuid = require('uuid');

/**@fileOverview 用户信息表 */

module.exports = app => {
  const Sequelize = app.Sequelize;
  const IdMembership = app.model.define('id_membership', {
    user_id: Sequelize.CHAR,
    group_id:Sequelize.CHAR
  }, {
    timestamps: true,
    // freezeTableName: true
  });

  return IdMembership;
};
