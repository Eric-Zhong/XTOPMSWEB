// use localStorage to store the authority info, which might be sent from server in actual project.
/* 在实际项目中，此处的 authority string 应该由服务器端返回 */

// const localStorage_authority_key = 'antd-pro-authority'; // 原来的值
const localStorage_authority_key = 'XTOPMS-AUTHORITY';

// 获取用户登录后的验证身份信息
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  // 用户的角色信息
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem(localStorage_authority_key) : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['admin'];
}

// 设置用户的身份信息
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem(localStorage_authority_key, JSON.stringify(proAuthority));
}
