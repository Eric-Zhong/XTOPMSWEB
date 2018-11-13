/* 参考分析文档
https://www.jianshu.com/p/64f8f34583a6
*/
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from './authority';


let Authorized = RenderAuthorized(getAuthority()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getAuthority());
};

export { reloadAuthorized };
export default Authorized;
