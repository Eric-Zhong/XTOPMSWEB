import { queryTags } from '@/services/api';
import mockjs from 'mockjs';

export default {
  namespace: 'bid',

  state: {
    tags: [],
  },

  effects: {
    *fetchTags(_, { call, put }) {
      // const response = yield call(queryTags);
      const response = mockjs.mock({'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],});
      yield put({
        type: 'saveTags',
        payload: response.list,
      });
    },
  },

  reducers: {
    saveTags(state, action) {
      return {
        ...state,
        tags: action.payload,
      };
    },
  },
};
