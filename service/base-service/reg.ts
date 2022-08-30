/**
 * 实训云管理侧正则表达式
 */

export class RegService {
  // 账号由中文、英文大小写、数字和下划线组成
  static readonly USERNAME = /^[\d\w\u4e00-\u9fa5]+$/;
  // 账号不能由纯数字组成
  static readonly NUMBER = /^[0-9]*$/;

  // 名称(姓名)由中文、英文大小写、任意数字组成
  static readonly REALNAME = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;

  // 手机号
  static readonly PHONE = /^1[3456789]\d{9}$/;

  // 密码只能包含大写字母、小写字母、数字和特殊字符且至少包含四种字符中的三种
  static readonly PASSWORD = /^(?![A-Za-z]+$)(?![A-Z\d]+$)(?![A-Z\W]+$)(?![a-z\d]+$)(?![a-z\W]+$)(?![\d\W]+$)\S{1,}$/;

  // 校验码只能由正整数组成
  static readonly CODE = /[^0-9]/;

  // 电子邮箱
  static readonly EMAIL = /^[-_.a-zA-Z0-9]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/;

  // 身份证号
  static readonly IDCARD = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

  // 活动编码
  static readonly CODING = /^([0-9])+(-)+([A-Za-z0-9])+$/;

  // 薪资
  static readonly SALARY = /^(([1-9][0-9]*)|(([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2})))$/;
}
