import { getStorage, removeStorage, setStorage } from "@/utils/storage";
import { STORAGE_CONFIG } from "@/model";
export default class GlobalUserInfoService {
  // 静态变量需要主动改变值才会更新
  static userInfo;
  static token;

  // 用户信息
  static setUserInfo(userInfo) {
    setStorage(STORAGE_CONFIG.USER_INFO, userInfo);
    this.userInfo = userInfo;
  }

  static getUserInfo() {
    this.userInfo = getStorage(STORAGE_CONFIG.USER_INFO)
      ? getStorage(STORAGE_CONFIG.USER_INFO)
      : "";
    return this.userInfo;
  }

  // 获取用户id
  static getUserId() {
    this.userInfo = getStorage(STORAGE_CONFIG.USER_INFO);
    return this.userInfo.user_id;
  }

  // 是否登录(是：true,否：false)
  static isLogin() {
    this.userInfo = getStorage(STORAGE_CONFIG.USER_INFO);
    return this.userInfo ? true : false;
  }

  // 清除用户登录信息
  static removeStorage() {
    removeStorage(STORAGE_CONFIG.USER_INFO);
    removeStorage(STORAGE_CONFIG.TOKEN);
  }
}
