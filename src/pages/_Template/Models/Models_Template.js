/*
* Description: Common model template
* Author: Eric-Zhong Xu
* Creation: 2019-05-06 09:38:44
* Copyright (c) 2019 Tigoole
 */

import {
  ServiceName,
  Get,
  GetAll, 
  GetAllWithFullAudited,
  Create,
  Delete,
  Remove,
  Update,
  GetMyAll,
  QuickSearch,
  GetDetailV1
  } from '@/services/_TemplateService'; // TODO: modify the service name.

import {message} from 'antd';

export const ModelName = ServiceName;
export default {

  namespace: ServiceName, // the service api's name.

  /** 
   * @property state
   */
  state: {
    data: [],           // storage the list after getall
    total: 0,           // total count
    search: [],         // quick search result
  },

  /**
   * @method effects
   */
  effects: {

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

    *update({payload}, {call, put}){
      const response = yield call(Update, payload);
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

    *delete({payload}, {call, put}){
      const customerId = payload;
      const response = yield call(Delete, customerId);
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
    }


  },

  /**
   * @method reducers
   */
  reducers: {

    clear(){
      return {
        data: [],
        total: 0,
        current: {},
        search: []
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
        success
      } = action.payload;

      return {
        ...state,
        data: items,
        total: totalCount,
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

  }
}