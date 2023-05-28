import { request } from '@umijs/max';
import { RequestEnum } from '@/enums/httpEnum';
import type { DeptTreeVo, SearchDeptDto } from '@/apis/types/system/dept';

/**
 * 查询部门树
 */
export function treeDept(params: SearchDeptDto) {
  return request<DeptTreeVo[]>('/system/dept/tree', {
    method: RequestEnum.GET,
    params,
  });
}
