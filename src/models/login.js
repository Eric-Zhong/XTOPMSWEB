/* 处理登录的接口写在这里 */
/* React effects reduces 中的概念 https://blog.csdn.net/zwp438123895/article/details/69374940 */
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import {setToken, getToken, setAccessToken} from '@/utils/token';

// 引用 xto 的核心 api
import {tokenAuth} from '@/services/xtoapi';
// Ant Pro 原来的 api
/* 引用 api 中定义的处理接口程序定义 */
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';

export default {
  namespace: 'login',

  /* 状态 */
  state: {
    status: undefined,
  },

  /* 响应 */
  /*
  Effect 被称为副作用，在我们的应用中，最常见的就是异步操作。它来自于函数编程的概念，之所以叫副作用是因为它使得我们的函数变得不纯，同样的输入不一定获得同样的输出。
  */
  effects: {

    // 处理登录请求. 用 *来定义函数名称
    *login({ payload }, { call, put }) {
      // 调用 web api 模拟登录身份验证. Response 为调用后的返回结果
      // const response = yield call(fakeAccountLogin, payload);

      // 去掉 ant 的登录验证，换成 xto 的登记。
      // response 即调用 ajax 后的返回 http response 对象。
      const response = yield call(tokenAuth, payload);
      // const response = yield call(fakeAccountLogin, payload);

      // ! 这里要小心处理一下，数据 web api 服务有问题，这时 response 为 undefined.

      // console.log('Login Response:');
      // console.log(response);


      // 先判断是否成功拿到了 response
      if(!response){ // 真没拿到API的返回结果（网络、API Server的异常引起的原因）
        // 如果 response 为空，或拿登录身份验证出错时，在下面这里处理
        // 使用reduce去通知修改View中的sstate数据
        yield put({
          type: 'changeLoginStatus', 
          payload: {
            __abp: '2.0',
            status: "404",
            success: false,
            result: {
              authority: null,
              authType: 'account',
            }
          },
        });
        return; // 退出该方法的执行。
      }


      // Login successfully
      // 为了兼容 XTO 与 Ant，这里重写了一下。
      if (
        (
          // XTO response model
          response.__abp && response.result && response.result.success === true
        )
        || // Ant response model
        (response.status === 'ok')
      ) {

        // 使用 put 调用 model 中定义的函数 "changeLoginStatus". changeLoginStatus 函数定义见最下面.
        yield put({
          type: 'changeLoginStatus', 
          payload: response,
        });

        if(response.__abp)
        {
          // 取 response 中获取到的 Token
          const token = response.result.accessToken;
          const accessToken = response.result.encryptedAccessToken;
          const expireInSeconds = response.result.expireInSeconds;
          const userId = response.result.userid;
          // 保存 Token
          setToken(token);
          setAccessToken(accessToken);
        }

        reloadAuthorized();

        const urlParams = new URL(window.location.href);
        const params = getPageQuery(); // 获取 URL 中的参数
        let { redirect } = params;

        // 如果存在需要跳转的路径，需要登录后，将页面跳转到该路径上
        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            // 如果跳转的地址，就是当前系统的另一个界面地址时
            redirect = redirect.substr(urlParams.origin.length); // 去掉前面的域名部分
            if (redirect.startsWith('/#')) { // 如果 URL 参数是 #开头，就去掉
              redirect = redirect.substr(2);
            }
          } 
          else {
            // 如果是其它系统的 URL，只能采用 Client 跳转
            window.location.href = redirect;
            return;
          }
        }
        else{
          redirect = "/";
        }

        // 通知页面进行跳转。这里需要注意，只有当用户的 Authority 中必须有非 guest 角色时，跳转到 / 时才生效，否则又回跳回到登录页面
        yield put(routerRedux.replace(redirect || '/'));
        // yield put(routerRedux.push(redirect));
      }
      else {
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  /*
  Reducer
  typeReducer<S, A> = (state: S, action: A) => S
  Reducer（也称为 reducing function）函数接受两个参数：之前已经累积运算的结果和当前要被累积的值，返回的是一个新的累积结果。该函数把一个集合归并成一个单值。

  在 dva 中，reducers 聚合积累的结果是当前 model 的 state 对象。通过actions 中传入的值，与当前 reducers 中的值进行运算获得新的值（也就是新的 state）。需要注意的是 Reducer 必须是纯函数，所以同样的输入必然得到同样的输出，它们不应该产生任何副作用。并且，每一次的计算都应该使用immutabledata，这种特性简单理解就是每次操作都是返回一个全新的数据（独立，纯净），所以热重载和时间旅行这些功能才能够使用。
  */
  reducers: {
    changeLoginStatus(state, { payload }) {
      
      if(payload)
      {
        if(payload.__abp) // XTOPMS 接口返回的数据
        {
          var resp = payload.result
          setAuthority(resp.authority);
          return {
            ...state,
            status: payload.success ? "ok" : "error",
            type: resp.authType,
          };
        }
        else
        {
          // 这里是原来 Ant.Design 中模拟的返回值
          setAuthority(payload.currentAuthority);
          return {
            ...state,
            status: payload.status,
            type: payload.type,
          };
        }
      } else {
        // ! 这里增加个判断，如果 Web API 出问题时，payload 的返回值会是 undefined.
        // 此时，只能先自己构建一个 payload，然后传递给 UI 层进行显示
        return {
          ...state,
          status: "error",
        };
    }
    },
  },
};
