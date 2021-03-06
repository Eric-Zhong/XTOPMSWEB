// 引用 http 组件
import request from '@/utils/request';

const CON_API_NAMED = 'user';
const CON_API_URI = '/api/services/app/' + CON_API_NAMED + '/';

// 获取所有用户信息
export async function getAll(params) {
  
  let currentPage = params.currentPage ? params.currentPage: 1;
  let pageSize = params.pageSize? params.pageSize: 10;
  let sorter = params.sorter? params.sorter: "_";

  /* 
   ! 参数示例：{currentPage: 1, pageSize: 10}
   ! 参数示例：{currentPage: 2, pageSize: 10}
   ! 参数示例：{currentPage: 2, pageSize: 10, sorter: 'id_descend'}
  */

  /*
   * 计算 XTO 可识别的分页参数
  */
 let skipCount = (currentPage - 1) * pageSize;
 let maxResultCount = pageSize;

  return request(
    `http://localhost:21021/api/services/app/User/GetAll?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}&sorter=${sorter}`, {
      method: 'GET',
      // mode: 'cors',
    }
  );
};

// 创建用户
export async function create(params) {
  let url = 'http://localhost:21021/api/services/app/User/Create';
  let option = {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  }
  return request(url, option);
};


/*
* 猎取当前登录用户信息
*/
export async function getCurrentUser(){
  let url = '/api/services/app/Session/GetCurrentLoginInformations';
  let option = {
    method: 'GET'
  }
  return request(url, option);
}


/*
* 获取当前用户下所有的组织框架数据
*/
export async function getOrganizationUnitTree(){
  let url = 'http://localhost:21021/api/services/app/OrganizationUnit/GetOrganizationUnitsTree';
  let option = {
    method: 'GET'
  }
  return request(url, option);
}

/**
 * @description Quick search user by key word.
 * @author Eric-Zhong Xu (Tigoole)
 * @date 2019-04-30
 * @export object
 * @param {*} params
 * @returns List User
 */
export async function QuickSearch(params) {
    const restParams = params;   // 如果没有特殊要求，不用进行二次加工。
    const option = {method: "POST", body: restParams, }
    return request(CON_API_URI + 'quicksearch', option);
}

