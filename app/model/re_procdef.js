'use strict';

/**@fileOverview 流程定义解析表, 解析成功了，在该表保存一条记录。业务流程定义数据表 */

/**
 * 注：此表和ACT_RE_DEPLOYMENT是多对一的关系，即，一个部署的bar包里可能包含多个流程定义文件，
 * 每个流程定义文件都会有一条记录在ACT_RE_PROCDEF表内，每个流程定义的数据，都会对于ACT_GE_BYTEARRAY表内
 * 的一个资源文件和PNG图片文件。和ACT_GE_BYTEARRAY的关联是通过程序用ACT_GE_BYTEARRAY.NAME与ACT_RE_PROCDEF.NAME_完成的，
 * 在数据库表结构中没有体现。
 */

module.exports = app => {
  const Sequelize = app.Sequelize;

  const ReProcdef = app.model.define('re_procdef', {
    // 流程ID，由“流程编号：流程版本号：自增长ID”组成
    id: {
      type: Sequelize.CHAR,
      primaryKey: true
    },
    // 流程名称（该编号就是流程文件process元素的name属性值）
    name: Sequelize.CHAR,
    // 流程命名空间（该编号就是流程文件targetNamespace的属性值）
    category: Sequelize.CHAR,
    // 流程编号（该编号就是流程文件process元素的id属性值）
    key: Sequelize.CHAR,
    // 流程版本号（由程序控制，新增即为1，修改后依次加1来完成的）
    version: {
      type: Sequelize.SMALLINT,
      defaultValue: 1
    },
    // 数据源信息, 以json格式保存流程定义的信息, 比如：{"name":"FTOA_SWGL","revision":1,"description":"丰台财政局OA，收文管理流程"}
    meta_info: Sequelize.TEXT,
    // 部署编号
    deployment_id: Sequelize.CHAR,
    // 资源文件名称, 流程bpmn文件名称
    resource_name: Sequelize.TEXT,
    // 图片资源文件名称, png流程图片名称
    dgrm_resource_name: Sequelize.TEXT,
    description: Sequelize.TEXT,
    // start节点是否存在formKey 0否  1是
    has_start_form_key: Sequelize.BOOLEAN,
    // 是否有图形符号
    has_graphical_notation: Sequelize.BOOLEAN,
    // 是否挂起, 1激活 2挂起
    suspension_state: Sequelize.TINYINT
  }, {
    timestamps: true,
    // freezeTableName: true
  });

  return ReProcdef;
};
