import { LoginData, LoginQuery, TianQiQuery } from "@/model";
import { UserApi } from "@/api";

export default class UserService {
  // 登录
  static login(data: LoginData) {
    return UserApi.login(data);
  }

  // 注册
  static register(data: LoginData) {
    return UserApi.register(data);
  }

  // 退出登录
  static loginOut() {
    return UserApi.loginOut();
  }

  // 天气预测
  static getTianQi(query: TianQiQuery) {
    return UserApi.getTianQi(query);
  }
}
