import { request } from '@umijs/max';
import { RequestEnum } from '@/enums/httpEnum';
import type { Pagination } from '@/apis/types/models';
import type { SysRole, SearchRoleDto } from '@/apis/types/system/role';

/**
 * 查询角色列表
 */
export function listRole(params: SearchRoleDto) {
  return request<Pagination<SysRole>>('/system/role/list', {
    method: RequestEnum.GET,
    params,
  });
}
