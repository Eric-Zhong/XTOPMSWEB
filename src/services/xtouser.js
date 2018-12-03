// 引用 http 组件
import request from '@/utils/request';

// 获取所有用户信息
export async function getAll(params) {
  let currentPage = params.currentPage ? params.currentPage: 1;
  let pageSize = params.pageSize? params.pageSize: 10;

  /* 
   ! 参数示例：{currentPage: 1, pageSize: 10}
   ! 参数示例：{currentPage: 2, pageSize: 10}
  */

  /*
   * 计算 XTO 可识别的分页参数
  */
 let skipCount = (currentPage - 1) * pageSize;
 let maxResultCount = pageSize;

  return request(
    `http://localhost:21021/api/services/app/User/GetAll?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}`, {
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