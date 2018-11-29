/*
定义全局权限配置清单，默认应该从 Role 后端生成此文件
*/
import {formatMessage} from 'umi/locale';

export default [
  {
    id: '1', // DB 中的 ID
    index: 1, // DB 中的排序
    label: formatMessage({id:'app.role.admin'}), // 翻译
    value: '1', // 设置在 Checkbox 上的值
  },
  {
    id: '2',
    index: 2,
    name: 'User',
    label: formatMessage({id:'app.role.user'}),
    value: '2',
  },
]