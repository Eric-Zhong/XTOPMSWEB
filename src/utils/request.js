import fetch from 'dva/fetch';
import { notification } from 'antd';
import router from 'umi/router';
import hash from 'hash.js';
import { isAntdPro } from './utils';

import {getToken} from '@/utils/token';
import { debug } from 'util';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 对 response 进行预处理，如果正确返回200，就进行下一步操作，如果报错，给出提示信息并抛出异常信息
const checkStatus = response => {

  // 2019-04-28 Eric: 先屏蔽掉此处的异常处理方法。 因为在 ABP 中，后台已经做了很好的异常处理，它会反馈 404, 401 等 statues code，但 response 上有正确的 json 数据。

  return response;

  if (response.status >= 200 && response.status < 300) {
    // 成功获取了服务器返回的响应数据
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });

  // 定义 V8 引擎中的 Error 类型，关返回给系统
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

const cachedSave = (response, hashcode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then(content => {
        sessionStorage.setItem(hashcode, content);
        sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};


/**
 * @description Parse json object to query string.
 * @param {obj} obj 
 */
const parseQuery = (obj) => {
  let str = ''
  for (let key in obj) {
    const value = typeof obj[key] !== 'string' ? JSON.stringify(obj[key]) : obj[key]
    str += '&' + key + '=' + value
  }
  return str.substr(1)
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, option) {

  // url = 'http://xtoapi.biztalkgroup.com' + url;
  // debugger;

  /* 执行 ajax 调用 */
  /* 打印输入参数 */
  const options = {
    expirys: isAntdPro(),
    ...option,
  };
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   * 生成一个用于标识某一类请求的 Hash 值。 后面做 Cache 时会用到这个 Code。
   */
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  const hashcode = hash
    .sha256()
    .update(fingerprint)
    .digest('hex');

  const defaultOptions = {
    credentials: 'include',
  };


  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT'
  ) {
    // 如果它不是 Form 类型的提交，给上面这些 Method 方式的 Ajax 调用，添加默认的 Http Header 信息。
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  } else if(
    newOptions.method === "GET" ||
    newOptions.method === 'DELETE'
  ){
    // 因为是GET请求，将Body中的Key-Value对象，映射到URL上。
    const queryString = parseQuery(newOptions.body);
    url = url + '?' + queryString;
  }

  // 在 XTOPMS 中，需要用到 Token
  var token = getToken();
  if(token){
    newOptions.headers = {
      Authorization: 'Bearer ' + token,
      ...newOptions.headers,
    };
  }

  const expirys = options.expirys && 60;
  // options.expirys !== false, return the cache,
  if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - whenCached) / 1000;
      // 如果 sessionStorage 中的数据没有过期，直接使用它里面的数据。
      // 这样可以有效减少后端数据库的交互操作。
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }

  return fetch(url, newOptions)
    .then(response => {
      // TODO: 这里主要是参加一个 Handler，为了打印 http response 内容。 PRD 时请去掉。
      console.log('/**************** http ajax request ***************/')
      if(url) console.log('Web API Uri: ' + url);
      if(newOptions) {
        console.log('Web API Request: ')
        console.log(newOptions);
      } 
      console.log('Web API Response: ');

      return response;
    })
    .then(checkStatus)
    .then(response => cachedSave(response, hashcode))
    .then(response => {
      // DELETE and 204 do not return data by default
      // using .json will report an error.
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .then(response=>{
      console.log('>>>>>>>> ');
      console.log(response);
      return response;
    })
    .catch(e => {

      console.log(e);

      notification.error({
        message: `接口调用异常`,
        description: e.message,
      });
    
      // ! 中途想使用 response， 必须先 clone。
      if(e.response){
        e.response
        .clone()
        .json()
        .then(content => {
          if(content && content.__abp){
            const result = content.error;
            if(result && result.items && result.items.length>0){
              console.log('>>>>>>>> ABP Array/List');
              const list = result.items;
              list.map((value, index, data)=>{
                console.log(value);      // 输出返回类似为 List 的每外 Item
              });
            } else {
              console.log('>>>>>>>> ABP Entity/Object');
              console.log(result);       // 输出 AbP 的 Result 的内容
            }
          } else {
            console.log('>>>>>>>> None ABP Object');
            console.log(content);       // 输出 Response 中 Body 的内容
          }
        });
      }

      if(e.response){
        return e.response.json();
      } else {
        return {
          success: false,
          message: e.message,
          error: e.message
        };
      }

      console.log(e);
      // debugger;


      const status = e.name;

      // 2019-04-08 Eric: 在这里处理一下由于调用ABP Web API引起的权限问题返回的 403 错误。
      const url = e.response.url;
      if(url.toLowerCase().indexOf('/api/services/app/')){    // 如果url中包含此字符串，说明是ABP的API返回值
        if(status === 403){                     // 当前登录的用户没有调用此 API 的权限
          var json = {
            __abp: 4.0,
            success: false,
            result: null,
            error: '你的权限设置，不允许进行此操作。',
          }
          return json;
        }else if(status === 404){
          var json = {
            __abp: 4.0,
            success: false,
            result: null,
            error: 'API接口不存在',
          }
          return json;
        }

      }


      if (status === 401) {
        // @HACK
        /* eslint-disable no-underscore-dangle */
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
      }

      // environment should not be used
      if (status === 403) {
        router.push('/exception/403');
      }

      if (status <= 504 && status >= 500) {
        // 20190422: 因为我们主要是用于 web api，当服务器反馈 500 错误时，暂时不要跳到 500 报错页面。
        // router.push('/exception/500');
        const response = e.response;
        return response.json();
      }

      if (status >= 404 && status < 422) {
        router.push('/exception/404');
      }

      if(status === "TypeError"){
        // 处理不可控的Error信息
        router.push('/exception/500'); // 用router.push 不起做用，页面不发生变化
      }

      return;
    }
  );
}
