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
    quickSearchResult: []
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
     * @description Get list data
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
          type: 'getAllReducer',
          payload: response,
        });
      } else {
        message.error(response.error);
      }
    },



    /**
     * @description Delete this entity.
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
     * @description Delete this entity.
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-28
     * @param {*} {payload}
     * @param {*} {call, put}
     */
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
     * @description Get an entity
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
     * @description Quick search entity by key.
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
     * @description Clear model's state
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
     * @description Update state when created.
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
     * @description get entity and refresh table view
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
     * @description Update state after entity searched.
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