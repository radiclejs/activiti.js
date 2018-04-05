/*
 * @Author: yuzhe.xing
 * @Date: 2018-01-19 17:22:34
 * @Last Modified by: yuzhe.xing
 * @Last Modified time: 2018-04-04 17:19:58
 */
'use strict';

const dataHelper = require('../../data/data-helper');
const constEnums = require('../../lib/const');

module.exports = {
  ...constEnums,

  /**
   * 读取数据文件并且初始化数据到DB, 仅一次
   */
  async syncDBDataOnlyOnce() {
    let originUserData = dataHelper.buildFakeUserData()

    if (!originUserData || !originUserData.length) {
      throw new Error('没有读取到用户数据')
    }

    console.info('get all origindata success')

    const { IdUser } = this.model;

    const checkUserData = await IdUser.findAll();

    if (checkUserData && checkUserData.length) {
      throw new Error('已经初始化过数据了, 请检查')
    }

    await IdUser.bulkCreate(originUserData);

    console.log('sync DB data end')
  }
};
