import Vue from "vue";
import request from "axios";
import { GlobalUserInfoService } from "@/service";

const axios = request.create();
axios.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "text/plain"; // 临时使用解决接口跨域
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response): any {
    if (response.data.code == 1) {
      GlobalUserInfoService.removeStorage();
      window.location.replace(`${Vue.prototype.$HOST["LOGIN"]}`);
      return;
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default axios;
