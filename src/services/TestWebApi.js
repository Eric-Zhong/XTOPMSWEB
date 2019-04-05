import request from '@/utils/request';

export async function add() {
  return request('/api/services/app/WebApi/Add');
}
