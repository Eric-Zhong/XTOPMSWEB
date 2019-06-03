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
* Creation: 2019-06-02 22:09:20
 */

import { message } from "antd";

import {
  ServiceName,
  Get,
  GetAll,
  Create,
  Delete,
  Remove,
  Update,
  Query,
  Resend
} from "@/services/AlibabaCallbackService";

export default {
  // namespace: 'user',
  namespace: ServiceName, // the service api's name.

  /**
   * @property state
   */
  state: {
    data: [], // storage the list after getall
    total: 0, // total count
    search: [], // quick search result
    query: {
      // query payload
      current: 1,
      pageSize: 10,
      sorting: "",
      filters: null
    },
    list: [],
    currentUser: {},
    editorVisible: false
  },

  // 使用 dva 的 effect 管理同步的异步调用
  effects: {
    *get({ payload }, { call, put }) {
      const customerId = payload;
      const response = yield call(Get, customerId);
      if (response.success) {
        yield put({
          type: "getReducer",
          payload: response
        });
      } else {
        message.error(response.message);
      }
    },

    *create({ payload }, { call, put }) {
      const response = yield call(Create, payload);
      if (response && response.success) {
        const payload = response.result;
        yield put({
          type: "createOrUpdateReducer",
          payload: payload
        });
      } else {
        console.log(response);
      }
    },

    *update({ payload }, { select, call, put, take }) {
      const state = yield select(state => state[ServiceName]);
      const response = yield call(Update, payload);
      if (response && response.success) {
        const result = response.result;
        if (payload._next) {
          // 如果前面调用设置了执行完后要执行其它event时
          yield put({
            type: payload._next,
            payload: payload._next_param
          });
        } else {
          yield put({
            type: "createOrUpdateReducer",
            payload: result
          });
          message.success("操作成功");
        }
      } else {
        message.error("操作失败");
        console.log(response);
      }
    },

    *delete({ payload }, { call, put }) {
      const customerId = payload;
      const response = yield call(Delete, customerId);
      if (response.success) {
      } else {
        message.error(response.message);
      }
    },

    *remove({ payload }, { call, put }) {
      const body = payload;
      const response = yield call(Remove, body);
      if (response.success) {
        const msg = body.id + " was deleted.";
        message.success(msg);
      } else {
        message.error(response.message);
      }
    },

    *resend({ payload }, { call, put }) {
      const body = payload;
      const response = yield call(Resend, body);
      if (response.success) {
        const msg = "数据重发成功";
        message.success(msg);
      } else {
        message.error(response.message);
      }
    },

    *query({ payload }, { call, put, select, take }) {
      const state = yield select(state => state[ServiceName]);
      const { current, pageSize, sorter, filters } = payload
        ? payload
        : state.query;
      const sorting =
        sorter && sorter.field
          ? sorter.field + " " + (sorter.order === "descend" ? "desc" : "asc")
          : "";
      var params = {
        skipCount: (current - 1) * pageSize,
        maxResultCount: pageSize,
        sorting: sorting,
        filters
      };
      const response = yield call(Query, params);
      if (response.success) {
        yield put({
          type: "getAllReducer",
          payload: {
            ...response,
            query: payload // 在此Modle的State中保存上次查询的条件
          }
        });

        if (payload._next) {
          yield put({
            type: payload._next,
            payload: payload._next_param
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
    *editorVisible({ payload }, { call, put, select, take }) {
      yield put({
        type: "changeEditorVisible",
        payload: payload
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload
      };
    },

    clear() {
      return {
        data: [], // storage the list after getall
        total: 0, // total count
        search: [], // quick search result
        query: {
          // query payload
          current: 1,
          pageSize: 10,
          sorting: "",
          filters: null
        }
      };
    },

    getReducer(state, action) {
      const payload = action.payload;
      const created = payload ? payload.result : null;
      return {
        ...state,
        current: created
      };
    },

    getAllReducer(state, action) {
      // XTOPMS api > XTOPMS UI
      const {
        result: { totalCount, items },
        success,
        query
      } = action.payload;

      return {
        ...state,
        data: items,
        total: totalCount,
        query: query
      };
    },

    createOrUpdateReducer(state, action) {
      const payload = action.payload;
      const created = payload ? payload.result : null;
      return {
        ...state,
        current: created
      };
    },

    changeEditorVisible(state, action) {
      return {
        ...state,
        editorVisible: action.payload
      };
    }
  }
};
