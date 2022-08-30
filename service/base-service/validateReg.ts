import { RegService } from "./reg";

export default class ValidateRegService {
  // 校验手机号
  static validatePhone(rule, value, callback): any {
    if (value) {
      if (value.length != 11) {
        callback(new Error("请保证输入11位有效手机号"));
      }
      if (!RegService.PHONE.test(value)) {
        callback(new Error("手机号格式有误，请重新输入"));
      }
    }
    callback();
  }

  // 校验手机短信验证码
  static validateSmsCode(rule, value, callback): void {
    if (value) {
      if (value.length != 6) {
        callback(new Error("请保证输入6位有效验证码"));
      }
      if (RegService.CODE.test(value)) {
        callback(new Error("验证码由纯数字组成"));
      }
    }
    callback();
  }

  // 校验密码
  static validatePassword(rule, value, callback): void {
    if (value == "") {
      callback(new Error("密码不能为空"));
    } else {
      if (value.length < 8 || value.length > 26) {
        callback(new Error("请保证8到26位有效长度"));
      }
      if (!RegService.PASSWORD.test(value)) {
        callback(
          new Error(
            "密码只能包含大写字母、小写字母、数字和特殊字符且至少包含四种字符中的三种"
          )
        );
      }
    }
    callback();
  }

  // 校验账号
  static validateUserName(rule, value, callback): void {
    if (value == "") {
      callback(new Error("账号不能为空"));
    } else {
      if (value.length < 6 || value.length > 26) {
        callback(new Error("请保证6到26位有效长度"));
      }
      if (!RegService.USERNAME.test(value)) {
        callback(new Error("账号仅支持中英文、数字和下划线，且不能为纯数字"));
      }
      if (RegService.NUMBER.test(value)) {
        callback(new Error("账号不能由纯数字组成"));
      }
    }
    callback();
  }

  // 校验名称(姓名)
  static validateRealName(rule, value, callback): void {
    if (value) {
      if (value.length < 1 || value.length > 30) {
        callback(new Error("请保证1到50位有效长度"));
      }
      if (!RegService.REALNAME.test(value)) {
        callback(new Error("只能由中文、英文大小写和数字组成"));
      }
    }
    callback();
  }

  // 校验电子邮箱
  static validateEmail(rule, value, callback): void {
    if (value) {
      if (!RegService.EMAIL.test(value)) {
        callback(new Error("电子邮箱格式有误，请重新输入"));
      }
    }
    callback();
  }

  // 校验身份证号
  static validateIdCard(rule, value, callback): void {
    if (value) {
      if (!RegService.IDCARD.test(value)) {
        callback(new Error("身份证号格式有误，请重新输入"));
      }
    }
    callback();
  }

  // 校验活动编码
  static validateCoding(rule, value, callback): void {
    if (value) {
      if (!RegService.CODING.test(value)) {
        callback(new Error(`请参照“202101-DEPT”格式`));
      }
    }
    callback();
  }

  // 校验薪资
  static validateSalary(rule, value, callback): void {
    if (value) {
      if (!RegService.SALARY.test(value)) {
        callback(new Error(`任意整数，可保留两位小数`));
      }
    }
    callback();
  }
}
