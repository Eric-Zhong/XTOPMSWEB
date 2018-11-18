// 引用 http 组件
import request from '@/utils/request';

// 获取所有用户信息
export async function getAll(params){
  let skipCount = 1; // params.skipCount?params.skipCount:0;
  let maxResultCount = 100; // params.maxResultCount?params.maxResultCount:50;
  return request(
    "http://localhost:21021/api/services/app/User/GetAll?SkipCount=" + skipCount 
      + "&MaxResultCount=" + maxResultCount, {
    method: 'GET',
    mode: 'cors',
  });
};

