/* 定义业务实体 Model, 使用了 dva https://dvajs.com */
/*
Model 对象的属性
namespace: 当前 Model 的名称。整个应用的 State，由多个小的 Model 的 State 以 namespace 为 key 合成
state: 该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出
reducers: Action 处理器，处理同步动作，用来算出最新的 State
effects：Action 处理器，处理异步动作

*/

// 引用针对自己的 Service/Api 定义
import { getAll } from '@/services/xtouser';

/* 定义 User Model */
export default {
  namespace: 'xtouser',

  // 默认的 state, 有 list 数组， currentUser 对象
  state: {
    list: [],
  },

  // 接收到需要处理当前 Store/State 数据的操作。
  // 主要用于更新 Store/State 中的数据。
  reducers: {
    initiateList(state, action) {
      return {
        ...state,
        list: action.payload.result.items,
      };
    },
  },

  // https://dvajs.com/guide/introduce-class.html#数据流图-2
  // Store/State(数据存储层) 与处系统的数据接口处理层，在这里定义的函数多数是Ajax函数。
  effects: {
    // 定义fetch函数，用于获取所有用户
    *query(_, { call, put }) {
      const response = yield call(getAll);
      yield put({
        type: 'initiateList',
        payload: response,
      });
    },
  },

};
