// 引用 http 组件
import request from '@/utils/request';

// 登录
export async function tokenAuth(params){
  return request("http://localhost:21021/api/TokenAuth/Authenticate", {
    method: 'POST',
    // mode: 'cors',
    headers:[
      {"Content-Type": "application/json"},
      {'accept':'text/plain'},
      {'Authorization':null}
    ],
    // Request.js 已经帮我们执行了 JSON.String 处理，所以这里不用再执行一次了
    body: {
      userNameOrEmailAddress: params.userName,
      password: params.password,
      tenancyName: params.tenancyName
    }
  });
};

