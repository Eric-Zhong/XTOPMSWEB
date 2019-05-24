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
* Creation: 2019-04-10 19:59:42
 */



import request from '@/utils/request';

const CON_API_NAMED = 'opportunity';
const CON_API_URI = '/api/services/app/' + CON_API_NAMED + '/';

export const ServiceName = CON_API_NAMED;

export async function GetAll(params) {
    const restParams = params;   // 如果没有特殊要求，不用进行二次加工。
    const option = {method: "GET", body: restParams, }
    return request(CON_API_URI + 'getall', option);
}

export async function Get(params) {
  const restParams = params;   // 如果没有特殊要求，不用进行二次加工。
  const option = {method: "GET", body: restParams, }
  return request(CON_API_URI + 'getall', option);
}

export async function GetMyAll(params) {
  const restParams = params;   // 如果没有特殊要求，不用进行二次加工。
  const option = {method: "GET", body: restParams, }
  return request(CON_API_URI + 'getmyall', option);
}

export async function Create(params) {
  const restParams = params;   // 如果没有特殊要求，不用进行二次加工。
  const option = {method: "POST", body: restParams, }
  return request(CON_API_URI + 'create', option);
}

export async function Update(params) {
  const restParams = params;   // 如果没有特殊要求，不用进行二次加工。
  const option = {method: "PUT", body: restParams, }
  return request(CON_API_URI + 'update', option);
}


export async function Delete(params) {
  const restParams = params;   // 如果没有特殊要求，不用进行二次加工。
  const option = {method: "DELETE", body: restParams, }
  return request(CON_API_URI + 'delete', option);
}

export async function QuickSearch(params) {
  const restParams = params;   // 如果没有特殊要求，不用进行二次加工。
  const option = {method: "POST", body: restParams, }
  return request(CON_API_URI + 'quicksearch', option);
}

export async function Query(params) {
  const restParams = params;   // 如果没有特殊要求，不用进行二次加工。
  const option = {method: "POST", body: restParams, }
  return request(CON_API_URI + 'query', option);
}