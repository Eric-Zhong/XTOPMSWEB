import { getAll, create } from '@/services/xtouser';
import { get } from 'https';

export default {

  namespace: 'usercenter',

  state: {
    // User Center
    data: {
      list: [],
      pagination: {},
    },
    // Create User Modal
    showCreateUserDialog: false,  // 弹出窗口的显示状态
    userIsCreating: false,        // 创建用户中
    createUserData: [],           // 创建的用户

  },

  effects: {
    *query({payload}, { call, put }) {
      console.log('Model:usercenter.effects.fetch()');
      // console.log(payload);
      const response = yield call(getAll, payload);
      yield put({
        type: 'fetch',
        payload: response,
        // params: payload, // 把调用时的参数也传给后面
      });
    },
    // handle create user dialog.
    *openCreateUserDialog({payload}, {call, put}){
      yield put({
        type: 'openCreateUser',
        payload: payload,
      });
    },
    *closeCreateUserDialog({payload}, {call, put}){
      yield put({
        type: 'closeCreateUser',
        payload: payload,
      });
    },
    // Create user
    *createUser({payload}, {call, put}){
      console.log(payload);
      console.log('call create user api in UserCenterModel.');
      const response = yield call(create, payload);
      console.log(response)
      // 判断 response 后，关闭窗口
      yield put({
        type: 'closeCreateUser',
        payload: response,
      });

      const response2 = yield call(getAll, payload);
      yield put({
        type: 'fetch',
        payload: response2,
        // params: payload, // 把调用时的参数也传给后面
      });

    },
  },

  reducers: {
    fetch(state, action) {
      const list = action.payload.result.items;
      const total = action.payload.result.totalCount;
      const newState = {
        ...state,
        data: {
          list: list,
          pagination: {},
        }
      };
      return newState; 
    },
    // Close create user dialog by change showCreateUserDialog value
    closeCreateUser(state, action){
      return {
        ...state,
        showCreateUserDialog: false
      }
    },
    openCreateUser(state, action){
      return {
        ...state,
        showCreateUserDialog: true
      }
    }
  },

};
