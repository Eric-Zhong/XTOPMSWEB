import { 
  Get,
  GetAll, 
  Create,
  Delete,
  Remove,
  Update,
  GetMyAll,
  QuickSearch,
  InitializeAccessToken
  } from '@/services/AccessTokenService';

import {message, Modal} from 'antd';

export default {

  namespace: 'access_token',

  /** 
   * @property state
   */
  state: {
    data: [],
    total: 0,
    current: {},
    quickSearchResult: []
  },

  /**
   * @method effects
   */
  effects: {

    *create({payload}, {call, put}){
      console.log(payload);
      const response = yield call(Create, payload);
      if(response && response.success){
        const payload = response.result;
        yield put({
          type: 'createReducer',
          payload: payload,
        });
      }
      else {
        console.log(response);
      }
    },

    /**
     * @description Get customer list data
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-08
     * @param {*} {payload}
     * @param {*} {call, put}
     */
    *getAll({payload}, {call, put}){
      const {current, pageSize} = payload;
      var params = {
        skipCount: (current -1) * pageSize,
        maxResultCount: pageSize,
      };
      const response = yield call(GetAll, params);
      if(response.success){
        yield put({
          type: "getAllReducer",
          payload: response,
        });
      } else {
        message.error(response.error);
      }
    },



    /**
     * @description Delete customer
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-10
     * @param {*} {payload}
     * @param {*} {call, put}
     */
    *delete({payload}, {call, put}){
      const body = payload;
      const response = yield call(Delete, body);
      if(response.success){

      } else {
        message.error(response.error);
      }
    },

    *remove({payload}, {call, put}){
      const body = payload;
      const response = yield call(Remove, body);
      if(response.success){
        const msg = body.id + ' was deleted.'
        message.success(msg);
      } else {
        message.error(response.error);
      }
    },




    /**
     * @description Get an customer data
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-10
     * @param {*} {payload}
     * @param {*} {call, put}
     */
    *get({payload}, {call, put}){
      const customerId = payload;
      const response = yield call(Get, customerId);
      if(response.success){
        yield put({
          type: 'getReducer',
          payload: response,
        });
        } else {
        message.error(response.error);

      }
    },


    /**
     * @description Quick search user by key.
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-15
     * @param {*} {payload}
     * @param {*} {call, put}
     */
    *quickSearch({payload}, {call, put}){
      const response = yield call(QuickSearch, payload);
      yield put({
        type: 'quickSearchReducer',
        payload: response,
      });
    },


    /**
     * @description Update token data.
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-23
     * @param {*} {payload}
     * @param {*} {call, put}
     */
    *update({payload}, {call, put}){
      const response = yield call(Update, payload);

      // 增加异常处理
      if(response.success){
        yield put({
          type: 'updateReducer',
          payload: response,
        });
      } else {
        if(response.error){
          if(response.error.details) {
            console.log(response.error.details);
          }
          if(response.error.message) {
            message.error(response.error.message);
          }
        }
      }

    },


    /**
     * @description Init access token
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-23
     * @param {*} {payload}
     * @param {*} {call, put}
     */
    *initializeAccessToken({payload}, {call, put}){
      const response = yield call(InitializeAccessToken, payload);
      if(response.success){
        Modal.success({
          title: 'successed',
          content: 'New token generated: ' + response.result.access_Token + ' .',
        });
        yield put({
          type: 'initializeAccessTokenReducer',
          payload: response.result,
        });
      } else {
        Modal.error({
          title: response.error.message,
          content: response.error.details
        });
      }
    }


  },

  /**
   * @method reducers
   */
  reducers: {


    /**
     * @description Clear current model's state
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-28
     * @returns 
     */
    clear(){
      return {
        data: [],
        total: 0,
        current: {},
        quickSearchResult: []
      }
    },


    /**
     * @description Reducer for get entity.
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-22
     * @param {*} state
     * @param {*} action
     * @returns NULL
     */
    getReducer(state, action){
      const payload = action.payload;
      const created = payload ? payload.result : null;
      return {
        ...state,
        currentCreated: created
      };
    },
  
    /**
     * @description Update state when customer created.
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-07
     * @param {*} state
     * @param {*} action
     * @returns null
     */
    createReducer(state, action){
      const payload = action.payload;
      return state;
    },


    /**
     * @description get customers data and refresh table view
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-08
     * @param {*} state
     * @param {*} action
     */
    getAllReducer(state, action){
      // XTOPMS api > XTOPMS UI
      const {
        result:{
          totalCount, 
          items
        }, 
        success
      } = action.payload;

      return {
        ...state,
        data: items,
        total: totalCount,
      };
    },


    updateReducer(state, action){
      return {
        current: action.payload
      }
    },


    /**
     * @description Update state after customer searched.
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-15
     * @param {*} state
     * @param {*} action
     */
    quickSearchReducer(state, action){
      const payload = action.payload;
      const data = payload ? payload.result : [];
      return {
        ...state,
        quickSearchResult: data,
      };
    },


    /**
     * @description 拿到 Init Token 后的 Reducer
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-23
     * @param {*} state
     * @param {*} action
     */
    initializeAccessTokenReducer(state, action){
      console.log(action);
      const payload = action.payload;
      return {
        ...state,
        current: payload
      };
    },
  }
}