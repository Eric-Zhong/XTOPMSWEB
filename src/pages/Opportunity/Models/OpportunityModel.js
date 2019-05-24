/*
* Apache License, Version 2.0
*
* Copyright (c) 2019 Tigoole
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at:
*     http://www.apache.org/licenses/LICENSE-2.0
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
 */
/*
*
* Copyright (c) 2019 Tigoole
*
* Author: Eric-Zhong Xu
*
* Creation: 2019-04-28 16:06:57
 */


import {
  ServiceName,
  Get,
  GetAll, 
  Create,
  Delete,
  Update,
  GetMyAll,
  QuickSearch,
  Query,
  } from '@/services/OpportunityService';

import { message } from 'antd';
import { stat } from 'fs';

export default {

  namespace: ServiceName,

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

    *update({payload}, {call, put}){
      const response = yield call(Update, payload);
      if(response && response.success){
        // const payload = response.result;
        // yield put({
        //   type: 'updateReducer',
        //   payload: payload,
        // });
        const resp = yield call(GetAll, undefined);
        if(resp.success){
          yield put({
            type: "getAllReducer",
            payload: resp,
          });
        } else {
          message.error(resp.error);
        }
      }
      else {
        message.error('更新失败了！');
      }
    },

    *getAll({payload}, {call, put}){
      const {current, pageSize, sorting, filters} = payload;
      var params = {
        skipCount: (current -1) * pageSize,
        maxResultCount: pageSize,
        sorting: sorting ? sorting : '',
        filters,
      };
      const response = yield call(GetAll, params);
      if(response.success){
        yield put({
          type: 'getAllReducer',
          payload: response,
        });
      } else {
        message.error(response.message);
      }
    },


    /**
     * @description Delete this entity.
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-28
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
     * @description Get an customer data
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-28
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
     * @date 2019-04-28
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

    *query({payload}, {call, put, select, take}){
      // 如果没有从前端传入分页信息，就使用当前Model中默认的分页参数
      const state = yield select(state=>state.opportunity);
      const {current, pageSize, sorter, filters} = payload ? payload : state.query;
      const sorting = sorter && sorter.field ? ( sorter.field + ' ' + (sorter.order === 'descend' ? 'desc' : 'asc')) : '';
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
            query: payload
          },
        });
      } else {
        message.error(response.message);
      }
    },
  },


  /**
   * @method reducers
   */
  reducers: {

    /**
     * @description Clear current model's state
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-28
     * @returns NULL
     */
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

    /**
     * @description Reducer for get entity.
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-28
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
     * @date 2019-04-28
     * @param {*} state
     * @param {*} action
     * @returns null
     */
    createReducer(state, action){
      const payload = action.payload;
      return state;
    },

    /**
     * @description Update state when customer created.
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-28
     * @param {*} state
     * @param {*} action
     * @returns null
     */
    updateReducer(state, action){
      const payload = action.payload;
      return state;
    },

    /**
     * @description get customers data and refresh table view
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-28
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
     * @date 2019-04-28
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