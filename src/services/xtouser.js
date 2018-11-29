// 引用 http 组件
import request from '@/utils/request';

// 获取所有用户信息
export async function getAll(params){
  console.log('xtouser.getAll()');
  console.log(params);
  let skipCount = 1; // params.skipCount?params.skipCount:0;
  let maxResultCount = 100; // params.maxResultCount?params.maxResultCount:50;
  // return request(
  //   "http://localhost:21021/api/services/app/User/GetAll?SkipCount=" + skipCount 
  //     + "&MaxResultCount=" + maxResultCount, {
  //   method: 'GET',
  //   mode: 'cors',
  // });
  return request(
    `http://localhost:21021/api/services/app/User/GetAll?SkipCount=${skipCount}&MaxResultCount=${maxResultCount}`, 
    {
    method: 'GET',
    // mode: 'cors',
    }
  );
};

// 创建用户
export async function create(params){
  console.log(params);
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

