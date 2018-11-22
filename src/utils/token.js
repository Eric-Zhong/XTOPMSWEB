const XTOPMS_Token = "XTOPMS-TOKEN";
const XTOPMS_AccessToken = "XTOPMS-EncryptedAccessToken"

export function setToken(str){
  localStorage.setItem(XTOPMS_Token, str);
}

export function getToken(){
  const token = localStorage.getItem(XTOPMS_Token);
  return token;
}

export function setAccessToken(str){
  localStorage.setItem(XTOPMS_AccessToken, str);
}

export function getAccessToken(){
  const token = localStorage.getItem(XTOPMS_AccessToken);
  return token;
}