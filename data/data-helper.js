'use strict';

const faker = require('faker');
const _ = require('lodash');

const buildData = function (options, num, extraData) {
  const result = [];
  for (let i = 0; i < num; i++) {
    let item = {};
    Object.keys(options).map(key => {
      item[key] = options[key].indexOf('{{') > -1 ? faker.fake(options[key]) : extraData[key][i];
    });
    result.push(item);
  }

  return result;
};

/**
 * 生成原始格式的假数据(员工)
 * @param {*} dataCount
 */
function buildFakeUserData(dataCount = 100) {
  let fakeData = buildData({
    email: '{{internet.email}}',
    username: '{{internet.userName}}',
    first: '{{name.firstName}}',
    last: '{{name.lastName}}',
    department_name: '{{commerce.department}}',
    mobile: '{{phone.phoneNumberFormat}}',
    avatar: '{{internet.avatar}}'
  }, dataCount);

  fakeData.forEach(obj => {
    obj.mobile = '1' + obj.mobile.split('-').join('')
    obj.pwd = '123456'
  })

  return fakeData
}

module.exports = {
  buildFakeUserData
}
