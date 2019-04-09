/**
 * @file Customer Service for Web Api
 * @author Eric-Zhong Xu
 * @copyright Tigoole Tech
 * @createDate 2019-04-06 21:35:00
 */

import request from '@/utils/request';


/**
 * Query customer data.
 *
 * @export
 * @param {object} params The query filter arguments by table component.
 * @returns JSON object
 */
export async function getAll(params) {
    const restParams = params; // 在这里得到需要传递给 web api 的实际参数
    const option = {
        method: "GET",
        body: restParams,
    }

    // Call web api.
    return request('/api/services/app/customer/getall', option);
}

/**
 * Create a new customer
 * @param {object} params JSON object from customer creation dialog form.
 * @summary 
 {
  "id": 6520338186470686720,
  "name": "北京钛谷诚泽网络通讯科技有限公司",
  "parentCompanyId": 0,
  "companyCode": "91110228691683137R",
  "shortName": "string",
  "bankName": "北京农村商业银行密云支行营业部",
  "bankAccount": "1201000103000034917",
  "person": "徐中",
  "phone": "18611178188",
  "fax": "010-66747443",
  "email": "xu.zhong@hotmail.com",
  "regionData": "",
  "address": "北京市密云县西大桥路69号密云县投资促进局办公楼305室-10",
  "rate": 5,
  "rateReason": ""
}
 */
export async function create(params) {
    const restParams = params; // 在这里得到需要传递给 web api 的实际参数
    const option = {
            method: "POST",
            body: restParams,
        }
        // Call web api.
    return request('/api/services/app/customer/create', option);
}