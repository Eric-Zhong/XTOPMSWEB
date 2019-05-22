import { 
  UserQuickSearch
} from '@/services/QuickSearchService';

import {message} from 'antd';

export default {

  namespace: 'userQuickSearch',

  /** 
   * @property state
   */
  state: {
    result: []
  },

  /**
   * @method effects
   */
  effects: {

    /**
     * @description Quick search user by key word.
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-30
     * @param {*} {payload}
     * @param {*} {call, put}
     */
    *quickSearch({payload},{call, put}){
      const request = payload;
      const newRequest = request;
      const response = yield call(UserQuickSearch, newRequest);
      if(response.success){
        yield put({
          type: 'quickSearchReducer',
          payload: response,
        });
      } else {
        message.error(response.error);
      }
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
        data: [],           // storage the list after getall
        total: 0,           // total count
        search: [],         // quick search result
        query: {            // query payload
          current: 1,
          pageSize: 10,
          sorting: '',
          filters: [],
        },
      }
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
        result: data
      };
    },

  }
}