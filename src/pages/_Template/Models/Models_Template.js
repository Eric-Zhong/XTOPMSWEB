import { 
  Get,
  GetAll, 
  Create,
  Delete,
  Update,
  GetMyAll,
  QuickSearch
  } from '@/services/_TemplateService';

  import {message} from 'antd';
import { stat } from 'fs';


export default {

  namespace: 'Template_Namespace',

  /** 
   * @property state
   */
  state: {
    data: [],
    total: 0,
    customerSearchResult: []
  },

  /**
   * @method effects
   */
  effects: {

    *create({payload}, {call, put}){
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
      const customerId = payload;
      const response = yield call(Delete, customerId);
      if(response.success){

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
    }


  },

  /**
   * @method reducers
   */
  reducers: {


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
        quickSearchResult: data
      };
    },

  }
}