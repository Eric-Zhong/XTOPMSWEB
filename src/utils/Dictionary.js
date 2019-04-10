/*
* Apache License, Version 2.0
*
* Copyright (c) 2019 Tigoole
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at:
*     http://www.apache.org/licenses/LICENSE-2.0
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
 */
/*
*
* Copyright (c) 2019 Tigoole
*
* Author: Eric-Zhong Xu
*
* Creation: 2019-04-09 21:23:13
 */


/**
 * @constant 客户分类
 */
const CustomerCategoryLib = [
  {key: '100010001', value: '业主'},
  {key: '100010002', value: '总包方'},
  {key: '100010003', value: '分包方'},
  {key: '100010004', value: '施工方'},
  {key: '100010005', value: '供货方'},
  {key: '100010006', value: '监理方'},
  {key: '100010007', value: '研究院'},
  {key: '100010008', value: '代理'},
  {key: '100010009', value: '竞争对手'},
];


/**
 * @constant 客户状态
 */
const CustomerStatusLib = [
  {key: '0', value: '临时', color:'orange'},
  {key: '1', value: '激活', color:'green'},
  {key: '2', value: '银牌', color:'purple'},
  {key: '3', value: '金牌', color:'red'},
  {key: '4', value: '警告', color:'red'},
  {key: '999', value: '失效', color:'gray'},
];

/**
 * @description 查询客户分类
 * @author Eric-Zhong Xu (Tigoole)
 * @date 2019-04-09
 * @export
 * @param {*} key
 * @returns object
 */
export function QueryCustomerCategory(key) {
  const findIndex = CustomerCategoryLib.findIndex(item => item.key === key);
  return CustomerCategoryLib[findIndex];
};

/**
 * @description 查询客户状态
 * @author Eric-Zhong Xu (Tigoole)
 * @date 2019-04-09
 * @export
 * @param {*} key
 * @returns object
 */
export function QueryCustomerStatus(key) {
  const findIndex = CustomerStatusLib.findIndex(item => item.key == key);
  return CustomerStatusLib[findIndex];
};