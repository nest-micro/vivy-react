import { request } from '@umijs/max';
import { RequestEnum } from '@/enums/httpEnum';

// 获取验证码
export function code() {
  return request('/captchaImage', {
    method: RequestEnum.GET,
    isToken: false,
  });
}

// 用户登录
export function login(params: API.Indexable) {
  return request('/login', {
    method: RequestEnum.POST,
    data: params,
    isToken: false,
  });
}

// 获取用户详细信息
export function getInfo() {
  return request('/getInfo', {
    method: RequestEnum.GET,
    skipErrorHandler: true,
  });
}

// 退出登录
export function logout() {
  return request('/logout', {
    method: RequestEnum.POST,
  });
}

// 查询用户个人信息
export function getUserProfile() {
  return request('/system/user/profile', {
    method: RequestEnum.GET,
  });
}

// 修改用户个人信息
export function updateUserProfile(params: API.Indexable) {
  return request('/system/user/profile', {
    url: '',
    method: RequestEnum.PUT,
    data: params,
  });
}

// 用户密码重置
export function updateUserPwd(params: API.Indexable) {
  return request('/system/user/profile/updatePwd', {
    method: RequestEnum.PUT,
    params,
  });
}
