import request from "./request";
/**
 * 用户登录
 * @param data object 用户账号密码
 */
export function login(data) {
  return request.post("/login", data, { login: false });
}
/**
 * 获取 BING 每日一图
 * @param data object 用户账号密码
 */
export function bing() {
  return request.get("/bing", { login: false });
}