/*
DVA Tutorial : 1.先为业务定义 Model.

1.1 用 namespace 定义 Model 的全局名称
1.2 用 state 定义 Model 当前的状态。 数据将保存在这里，直接决定了 View 层的输出
1.3 用 reducers 定义 Action 的处理器，处理同步动作，用于更新最新状态的 state
1.4 用 effects 定义 Action 的处理器，处理异步动作，主要用于访问服务器资源
1.4.1 用 call 来调用定义的异步动作，如调用 ajax 请求函数
1.4.2 用 put 来触发一个 action。一般执行完 put 操作得到返回结果后，使用 put 调用 effects 中的 action 来更新 state

*/

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

  // 1.1
  namespace: 'xtouser',

  // 1.2
  // 默认的 state, 有 list 数组，
  // Ant 中的 StandardTable 中定义的 data 参数里，必须有 list 和 pagination 两个参数
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  // 1.3
  // 接收到需要处理当前 Store/State 数据的操作。
  // 主要用于更新 Store/State 中的数据。
  reducers: {
    fetch(state, action) {
      console.log('Model:xtouser.fetch()');
      const newState = {
        ...state,
        data: {
          list: action.payload.result.items,
          pagination: {},
        }
      };
      console.log(newState);
      return newState; 
    },
  },

  // 1.4
  // https://dvajs.com/guide/introduce-class.html#数据流图-2
  // Store/State(数据存储层) 与处系统的数据接口处理层，在这里定义的函数多数是Ajax函数。
  effects: {
    // 定义fetch函数，用于获取所有用户
    *query(_, { call, put }) {
      const response = yield call(getAll);
      yield put({
        type: 'fetch',
        payload: response,
      });
    },
  },

};
