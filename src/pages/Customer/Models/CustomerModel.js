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
* Description: Customer Model
* Author: Eric-Zhong Xu
* Creation: 2019-04-07 09:16:27
* Copyright (c) 2019 Tigoole
 */

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
  GetDetailV1,
  Query
} from "@/services/CustomerService"; // TODO: modify the service name.

import { message } from "antd";

export default {
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
    }
  },

  /**
   * @method effects
   */
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

    *getAll({ payload }, { call, put, select, take }) {
      // 如果没有从前端传入分页信息，就使用当前Model中默认的分页参数
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
      const response = yield call(GetAll, params);
      if (response.success) {
        yield put({
          type: "getAllReducer",
          payload: {
            ...response,
            query: payload
          }
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
      const response = yield call(Update, payload);
      if (response && response.success) {
        const payload = response.result;
        const state = yield select(state => state.customer);
        const query = state.query;
        yield put({
          type: "getAll",
          payload: query
        });
        yield take("getAll/@@end");
        message.success("操作成功");
      } else {
        message.error("操作失败");
      }
    },

    *delete({ payload }, { call, put }) {
      const customerId = payload;
      const response = yield call(Delete, customerId);
      if (response && response.success) {
        message.success("删除成功");
      } else {
        message.error(response.error);
      }
    },

    *remove({ payload }, { call, put }) {
      const body = payload;
      const response = yield call(Remove, body);
      if (response.success) {
        const msg = body.id + " 删除成功。";
        message.success(msg);
      } else {
        const msg = body.id + " 删除失败。\n" + response.message;
        message.error(msg);
      }
    },

    *quickSearch({ payload }, { call, put }) {
      // init the request value.
      const params = {
        value: payload.value ? payload.value : "",
        count: payload.count ? payload.count : 20
      };
      const response = yield call(QuickSearch, params);
      yield put({
        type: "quickSearchReducer",
        payload: response
      });
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
            query: payload
          }
        });
      } else {
        message.error(response.message);
      }
    }
  },

  /**
   * @method reducers
   */
  reducers: {
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

    quickSearchReducer(state, action) {
      const payload = action.payload;
      const data = payload ? payload.result : [];
      return {
        ...state,
        search: data
      };
    },

    createOrUpdateReducer(state, action) {
      const payload = action.payload;
      const created = payload ? payload.result : null;
      return {
        ...state,
        current: created
      };
    }
  }
};
