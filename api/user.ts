import request from "@/utils/request";
import { LoginData, LoginQuery } from "@/model";

const userUrl = "";
export default class UserApi {
  // 登录
  static login(data: LoginData) {
    return request({
      url: `${userUrl}/login`,
      method: "POST",
      data,
    }).then((res) => {
      return res.data;
    });
  }

  // 注册
  static register(data: LoginData) {
    return request({
      url: `${userUrl}/register`,
      method: "POST",
      data,
    }).then((res) => {
      return res.data;
    });
  }

  // 退出登录
  static loginOut() {
    return request({
      url: `${userUrl}/logout`,
      method: "GET",
    }).then((res) => {
      return res.data;
    });
  }
}
