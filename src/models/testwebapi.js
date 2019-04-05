import { add } from "@/services/TestWebApi";

export default {
  
  namespace: "testwebapi",

  state: {},
  
  effects: {
    *add(_, {call, put}){
      const response = yield call(add);
      yield put({
        type: "added",
        payload: response,
      });
    }
  },

  reducers: {
    added(state, action){
      return {
        ...state,
        result: action.response,
      };
    }
  }
};

