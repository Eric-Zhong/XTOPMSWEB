// 引用 http 组件
import request from '@/utils/request';

const CON_API_NAMED = 'user';
const CON_API_URI = '/api/services/app/' + CON_API_NAMED + '/';

/**
 * @description Quick search user by key word.
 * @author Eric-Zhong Xu (Tigoole)
 * @date 2019-04-30
 * @export object
 * @param {*} params
 * @returns List User
 */
export async function UserQuickSearch(params) {
    const restParams = params;   // 如果没有特殊要求，不用进行二次加工。
    const option = {method: "POST", body: restParams, }
    return request(CON_API_URI + 'quicksearch', option);
}

