/* 处理登录的接口写在这里 */
/* React effects reduces 中的概念 https://blog.csdn.net/zwp438123895/article/details/69374940 */
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
/* 引用 api 中定义的处理接口程序定义 */
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

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
      const response = yield call(fakeAccountLogin, payload);

      // 使用 put 调用下一个函数 "changeLoginStatus". changeLoginStatus 函数定义见最下面.
      yield put({
        type: 'changeLoginStatus', 
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery(); // 获取 URL 中的参数
        let { redirect } = params; // 
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
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
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
