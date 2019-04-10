// Import services


export default {
   
  namespace: 'model_namespace',

  

  state: {
  },



  effects: {
    *get({payload},{call, put}){
      const response = yield call('api', payload);
      yield put({
        type: 'namespace/reducer',
        payload: response,
      });
    }
  },



  reducers: {
    *update(state, action){
      return {
        ...state,
        data: action.payload,
      }
    }
  }

  
}