const XTOPMS_Token = "XTOPMS-TOKEN";


export function setToken(str){
  localStorage.setItem(XTOPMS_Token, str);
}

export function getToken(){
  const token = localStorage.getItem(XTOPMS_Token);
  return token;
}