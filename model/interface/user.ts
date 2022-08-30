export interface LoginData {
  email: string;
  password: string;
}

export interface LoginQuery {
  id: string;
  autoLogin: string;
}

export interface TianQiQuery {
  unescape: any;
  version: string;
  appid: string;
  appsecret: string;
}