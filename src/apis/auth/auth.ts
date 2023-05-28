import { request } from '@umijs/max';
import { RequestEnum } from '@/enums/httpEnum';
import type { LoginInfoDto, LoginResultVo } from '@/apis/types/auth/auth';

/**
 * 用户登录
 * @param params 账户信息
 * @returns {LoginResultVo}
 */
export function login(params: LoginInfoDto) {
  return request<LoginResultVo>('/auth/login', {
    method: RequestEnum.POST,
    data: params,
    isToken: false,
    skipErrorHandler: true,
  });
}

/**
 * 用户退出
 * @returns
 */
export function logout() {
  return request('/auth/logout', {
    method: RequestEnum.POST,
  });
}
