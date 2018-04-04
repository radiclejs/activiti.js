/*
 * @Author: yuzhe.xing
 * @Date: 2018-01-19 17:22:34
 * @Last Modified by: yuzhe.xing
 * @Last Modified time: 2018-04-04 17:19:58
 */
'use strict';

const jsonfile = require('jsonfile');
const path = require('path');
const _ = require('lodash');
const dataHelper = require('../../data/data-helper');
const constEnums = require('../../lib/const');

module.exports = {
  ...constEnums,

  get IS_DEV() {
    return this.config.env === 'local' || this.config.env === 'unittest' || this.config.env === 'test'
  },
  /**
   * 同步表结构到远程DB服务器(只创建一次, 从无到有)
   */
  async syncDBOnlyOnce() {
    console.log('sync DB start')
    await this.model.sync();
    console.log('sync DB done');
  },

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

    await IdUser.bulkCreate(dataHelper.buildFakeUserData(originUserData));

    console.log('sync DB data end')
  },

  /**
   * 警告: 创世, 删除所有数据, 重新造新数据, 一切初始化
   * 仅能在本地环境使用
   */
  async TheCreation() {
    await this.model.drop();
    await this.syncDBOnlyOnce();
    await this.syncDBDataOnlyOnce();
  }
};
