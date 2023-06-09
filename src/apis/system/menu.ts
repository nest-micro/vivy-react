import { request } from '@umijs/max';
import { RequestEnum } from '@/enums/httpEnum';
import type { MenuTreeVo } from '@/apis/types/system/menu';

/**
 * 查询菜单树
 */
export function treeMenu() {
  return request<MenuTreeVo[]>('/system/menu/tree', {
    method: RequestEnum.GET,
  });
}
