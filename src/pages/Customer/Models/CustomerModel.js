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
* Creation: 2019-04-07 09:16:27
 */


import { 
  get as Get,
  getAll as GetAllApi, 
  create as createApi,
  deleteCustomer as Delete,
} from '@/services/CustomerService';


export default {

  namespace: 'customer',

  /** 
   * @property state
   */
  state: {
    data: [],
    total: 0,
  },

  /**
   * @method effects
   */
  effects: {

    /**
     * @description create new customer by web api.
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-07
     * @param {*} {payload}
     * @param {*} {call, put}
     */
    *create({payload}, {call, put}){
      const response = yield call(createApi, payload);
      if(response && response.success){     // 创建customer成功后的处理
        // 将创建后的customer回传给前端进行重新处理
        const payload = response.result;
        yield put({
          type: 'customerCreated',
          payload: payload,
        });
      }
      else {                                // 创建customer失败后的处理
        // TODO: 这里需要写点代码，来处理创建Customer失败后的处理逻辑。
        // src/utils/request.js 返回 response 的定义见此 js 文件
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

      console.log(params);

      const response = yield call(GetAllApi, params);
      
      yield put({
        type: "customerGetAll",
        payload: response,
      });
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
      console.log(response);
      // TODO: 要不要通知前台界面？
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
      // TODO: 传递给前端
      console.log(response);
    }


  },

  /**
   * @method reducers
   */
  reducers: {
  
    /**
     * @description Update state when customer created.
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-07
     * @param {*} state
     * @param {*} action
     * @returns null
     */
    customerCreated(state, action){
      // 通过 Customer Creation Dialog 创建完 Customer 后，会回调这个函数
      // 但因为是在 Dialog 中执行的创建操作，而且创建完成后，Dialog 会销毁
      // 这里写的方法基本就不会有什么执行后的效果了。
      // ! 从设计的角色看，这个Model应该写在 Index 上，而不是写在 Dialog 上进行调用会更合理一些。
      // 此时先屏蔽掉
      return state;
      
      var newData = state.data;
      newData.push(action.payload);
      return {
        ...state,
        data: newData,
        visible: {
          creation: false,
        }
      }
    },


    /**
     * @description get customers data and refresh table view
     * @author Eric-Zhong Xu (Tigoole)
     * @date 2019-04-08
     * @param {*} state
     * @param {*} action
     */
    customerGetAll(state, action){
      // 处理ajax返回值
      const {result:{totalCount, items}, success} = action.payload;

      return {
        ...state,
        data: items,
        total: totalCount,
      };
    }
  }
}