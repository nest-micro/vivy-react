import { request } from '@umijs/max';
import { RequestEnum } from '@/enums/httpEnum';
import type { MenuTreeVo, SearchMenuDto } from '@/apis/types/system/menu';

/**
 * 查询菜单树
 */
export function treeMenu(params: SearchMenuDto) {
  return request<MenuTreeVo[]>('/system/menu/tree', {
    method: RequestEnum.GET,
    params,
  });
}
