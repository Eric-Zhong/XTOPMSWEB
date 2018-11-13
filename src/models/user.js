/* 定义业务实体 Model, 使用了 dva https://dvajs.com */

// 引用针对自己的 Service/Api 定义
import { query as queryUsers, queryCurrent } from '@/services/user';

/* 定义 User Model */
export default {
  namespace: 'user',

  // 默认的 state, 有 list 数组， currentUser 对象
  state: {
    list: [],
    currentUser: {},
  },

  // 使用 dva 的 effect 管理同步的异步调用
  effects: {
    // 定义fetch函数，用于获取所有用户
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
