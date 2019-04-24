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
* Creation: 2019-04-22 15:51:41
 */



import request from '@/utils/request';

const CON_API_NAMED = 'accesstoken';
const CON_API_URI = '/api/services/app/' + CON_API_NAMED + '/';

export async function GetAll(params) {
    const restParams = params;   // 如果没有特殊要求，不用进行二次加工。
    const option = {method: "GET", body: restParams, }
    return request(CON_API_URI + 'GetAll', option);
}

export async function Get(params) {
  const restParams = params;   // 如果没有特殊要求，不用进行二次加工。
  const option = {method: "GET", body: restParams, }
  return request(CON_API_URI + 'Get', option);
}

export async function GetMyAll(params) {
  const restParams = params;   // 如果没有特殊要求，不用进行二次加工。
  const option = {method: "GET", body: restParams, }
  return request(CON_API_URI + 'getmyall', option);
}

export async function Create(params) {
  const restParams = params;   // 如果没有特殊要求，不用进行二次加工。
  const option = {method: "POST", body: restParams, }
  return request(CON_API_URI + 'Create', option);
}

export async function Update(params) {
  const restParams = params;   // 如果没有特殊要求，不用进行二次加工。
  const option = {method: "PUT", body: restParams, }
  return request(CON_API_URI + 'Update', option);
}

export async function Delete(params) {
  const restParams = params;   // 如果没有特殊要求，不用进行二次加工。
  const option = {method: "DELETE", body: restParams, }
  return request(CON_API_URI + 'Delete', option);
}

export async function Remove(params) {
  const restParams = params;   // 如果没有特殊要求，不用进行二次加工。
  const option = {method: "DELETE", body: restParams, }
  return request(CON_API_URI + 'Remove', option);
}

export async function QuickSearch(params) {
  const restParams = params;   // 如果没有特殊要求，不用进行二次加工。
  const option = {method: "POST", body: restParams, }
  return request(CON_API_URI + 'QuickSearch', option);
}

/**
 * @description 刷新 Token （多用于初次获取Token）
 * @author Eric-Zhong Xu (Tigoole)
 * @date 2019-04-23
 * @export
 * @param {*} params {"accessTokenId": 0,"code": "string"}
 * @returns JSON
 */
export async function InitializeAccessToken(params) {
  const restParams = params;   // 如果没有特殊要求，不用进行二次加工。
  const option = {method: "POST", body: restParams, }
  return request(CON_API_URI + 'initializeaccesstoken', option);
}



