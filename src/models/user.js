/* 定义业务实体 Model, 使用了 dva https://dvajs.com */

import { message } from 'antd';

import {
  ServiceName,
  getCurrentUser,
  Get,
  GetAll, 
  GetAllWithFullAudited,
  Create,
  Delete,
  Remove,
  Update,
  GetMyAll,
  QuickSearch,
  GetDetailV1,
  Query
  } from '@/services/UserService';

/*
! Ant Design 支持的数据格式如下
{
  name: 'Serati Ma',
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  userid: '00000001',
  email: 'antdesign@alipay.com',
  signature: '海纳百川，有容乃大',
  title: '交互专家',
  group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
  tags: [{
    key: '0',
    label: '很有想法的'
  }, {
    key: '1',
    label: '专注设计'
  }],
  notifyCount: 12,
  country: 'China',
  geographic: {
    province: {
      label: '浙江省',
      key: '330000'
    },
    city: {
      label: '杭州市',
      key: '330100'
    }
  },
  address: '西湖区工专路 77 号',
  phone: '0752-268888888'
}
*/

/* 定义 User Model */
export default {

  // namespace: 'user',
  namespace: ServiceName, // the service api's name.

  /** 
   * @property state
   */
  state: {
    data: [],           // storage the list after getall
    total: 0,           // total count
    search: [],         // quick search result
    query: {            // query payload
      current: 1,
      pageSize: 10,
      sorting: '',
      filters: null,
    },
    list: [],
    currentUser: {},
    editorVisible: false,
  },

  // 使用 dva 的 effect 管理同步的异步调用
  effects: {
    // 定义fetch函数，用于获取所有用户
    // *fetch(_, { call, put }) {
    //   const response = yield call(queryUsers);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    // },
    *fetchCurrent(_, { call, put }) {
      // const response = yield call(queryCurrent);
      const response = yield call(getCurrentUser);
      // ! 从 XTOPMS 系统中获取 Current User 信息
      // TODO: 后期需要对这里的数据结构进行调整

      // 如果没拿到用户信息，需要通知用户得新登录系统。
      // 2019-04-02 Eric, 修复了此问题
      if(
        !response ||
        response === null || 
        !response.result ||
        !response.result.user || 
        // Ant 设计的 dispatch 功能，暂时不清楚是干什么用的，后面应该如何判断。
        /*
        !response.dispatch ||
        response.dispatch === null || 
        user === null
        */
        false
        ){
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
        return;
      }
      else{
        // 从后台得到了登录后的用户信息
        const user = response.result.user;
        let currentUser = {
          ...user,
          avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
          userid: user.id,
          email: user.emailAddress,
          signature: '',
          title: user.title,
          group: '',
          tags: [{
            key: '0',
            label: '管理员'
          }, {
            key: '1',
            label: 'Admin'
          }],
          notifyCount: 1,
          country: 'China',
          geographic: {
            province: {
              label: '浙江省',
              key: '330000'
            },
            city: {
              label: '杭州市',
              key: '330100'
            }
          },
          address: '',
          phone: '18611178188'
        };
  
        yield put({
          type: 'saveCurrentUser',
          payload: currentUser,
        });
      }
    },

    *get({payload}, {call, put}){
      const customerId = payload;
      const response = yield call(Get, customerId);
      if(response.success){
        yield put({
          type: 'getReducer',
          payload: response,
        });
        } else {
        message.error(response.message);

      }
    },

    *getAll({payload}, {call, put, select, take}){
      const state = yield select(state=>state[ServiceName]);
      const {current, pageSize, sorter, filters} = payload ? payload : state.query;
      const sorting = sorter ? ( sorter.field + ' ' + (sorter.order === 'descend' ? 'desc' : 'asc')) : '';
      var params = {
        skipCount: (current - 1) * pageSize,
        maxResultCount: pageSize,
        sorting: sorting,
      };
      const response = yield call(GetAll, params);
      if(response.success){
        yield put({
          type: 'getAllReducer',
          payload: {
            ...response,
            query: payload
          },
        });
      } else {
        message.error(response.message);
      }
    },

    *getAllWithFullAudited({payload}, {call, put, select, take}){
      const state = yield select(state=>state[ServiceName]);
      const {current, pageSize, sorter, filters} = payload ? payload : state.query;
      const sorting = sorter ? ( sorter.field + ' ' + (sorter.order === 'descend' ? 'desc' : 'asc')) : '';
      var params = {
        skipCount: (current - 1) * pageSize,
        maxResultCount: pageSize,
        sorting: sorting,
      };
      const response = yield call(GetAllWithFullAudited, params);
      if(response.success){
        yield put({
          type: 'getAllReducer',
          payload: {
            ...response,
            query: payload
          },
        });
      } else {
        message.error(response.message);
      }
    },


    *create({payload}, {call, put}){
      const response = yield call(Create, payload);
      if(response && response.success){
        const payload = response.result;
        yield put({
          type: 'createOrUpdateReducer',
          payload: payload,
        });
      }
      else {
        console.log(response);
      }
    },

    *update({payload}, {select, call, put, take}){
      const state = yield select(state=>state[ServiceName]);
      const response = yield call(Update, payload);
      if(response && response.success){
        const result = response.result;
        if(payload._next){ // 如果前面调用设置了执行完后要执行其它event时
          yield put({
            type: payload._next,
            payload: payload._next_param,
          });
        }
        else{
          yield put({
            type: 'createOrUpdateReducer',
            payload: result,
          });
          message.success('操作成功');
        }
      }
      else {
        message.error('操作失败');
        console.log(response);
      }
    },

    *delete({payload}, {call, put}){
      const customerId = payload;
      const response = yield call(Delete, customerId);
      if(response.success){

      } else {
        message.error(response.message);
      }
    },

    *remove({payload}, {call, put}){
      const body = payload;
      const response = yield call(Remove, body);
      if(response.success){
        const msg = body.id + ' was deleted.'
        message.success(msg);
      } else {
        message.error(response.message);
      }
    },

    *quickSearch({payload}, {call, put}){
      // init the request value.
      const params = {
        value: payload.value? payload.value: '',
        count: payload.count? payload.count: 20,
      };
      const response = yield call(QuickSearch, params);
      yield put({
        type: 'quickSearchReducer',
        payload: response,
      });
    },

    *query({payload}, {call, put, select, take}){

      const state = yield select(state=>state[ServiceName]);
      const {
        current, 
        pageSize, 
        sorter, 
        filters
      } = (payload ? payload : state.query);
      const sorting = sorter ? ( sorter.field + ' ' + (sorter.order === 'descend' ? 'desc' : 'asc')) : '';
      var params = {
        skipCount: (current - 1) * pageSize,
        maxResultCount: pageSize,
        sorting: sorting,
        filters,
      };
      const response = yield call(Query, params);
      if(response.success){
        yield put({
          type: 'getAllReducer',
          payload: {
            ...response,
            query: payload    // 在此Modle的State中保存上次查询的条件
          },
        });

        if(payload._next){
          yield put({
            type: payload._next,
            payload: payload._next_param,
          });
        }

      } else {
        message.error(response.message);
      }
    },

    /**
     * @description Change entity editor dialog status
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-05-29
     * @param {*} {payload}
     * @param {*} {call, put, select, take}
     */
    *editorVisible({payload}, {call, put, select, take}){
      yield put({
        type: 'changeEditorVisible',
        payload: payload,
      });
    }

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


    clear(){
      return {
        data: [],           // storage the list after getall
        total: 0,           // total count
        search: [],         // quick search result
        query: {            // query payload
          current: 1,
          pageSize: 10,
          sorting: '',
          filters: null,
        },
      }
    },

    getReducer(state, action){
      const payload = action.payload;
      const created = payload ? payload.result : null;
      return {
        ...state,
        current: created
      };
    },

    getAllReducer(state, action){
      // XTOPMS api > XTOPMS UI
      const {
        result:{
          totalCount, 
          items
        }, 
        success,
        query,
      } = action.payload;

      return {
        ...state,
        data: items,
        total: totalCount,
        query: query,
      };
    },

    quickSearchReducer(state, action){
      const payload = action.payload;
      const data = payload ? payload.result : [];
      return {
        ...state,
        search: data
      };
    },

    createOrUpdateReducer(state, action){
      const payload = action.payload;
      const created = payload ? payload.result : null;
      return {
        ...state,
        current: created
      };
    },

    changeEditorVisible(state, action){
      return {
        ...state,
        editorVisible: action.payload,
      }
    },
  },
};
