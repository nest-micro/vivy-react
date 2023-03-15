import { request } from '@umijs/max';

// 获取验证码
export function code() {
  return request('/api/captchaImage', {
    method: 'GET',
    isToken: false,
  });
}

// 用户登录
export function login(params: API.Indexable) {
  return request('/api/login', {
    method: 'POST',
    data: params,
    isToken: false,
  });
}

// 获取用户详细信息
export function getInfo() {
  return request('/api/getInfo', {
    method: 'GET',
    skipErrorHandler: true,
  });
}

// 退出登录
export function logout() {
  return request('/api/logout', {
    method: 'POST',
  });
}
