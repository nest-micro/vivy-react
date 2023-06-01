import { request } from '@umijs/max';
import { RequestEnum } from '@/enums/httpEnum';
import type { Pagination } from '@/apis/types/models';
import type { SysUser, SearchUserDto } from '@/apis/types/system/user';

/**
 * 查询用户列表
 */
export function listUser(params: SearchUserDto) {
  return request<Pagination<SysUser>>('/system/user/list', {
    method: RequestEnum.GET,
    params,
  });
}
