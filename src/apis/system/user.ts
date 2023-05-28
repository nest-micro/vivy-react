import { request } from '@umijs/max';
import { RequestEnum } from '@/enums/httpEnum';
import type { Pagination } from '@/apis/types/models';
import type { SysUser, SearchUserDto } from '@/apis/types/system/user';

/**
 * 用户登录信息
 */
export function getLoginUserInfo() {
  return request<LoginUserInfo>('/system/user/getLoginUserInfo', {
    method: RequestEnum.GET,
    skipErrorHandler: true,
  });
}

/**
 * 查询用户列表
 */
export function listUser(params: SearchUserDto) {
  return request<Pagination<SysUser>>('/system/user/list', {
    method: RequestEnum.GET,
    params,
  });
}
