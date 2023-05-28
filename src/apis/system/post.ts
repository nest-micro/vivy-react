import { request } from '@umijs/max';
import { RequestEnum } from '@/enums/httpEnum';
import type { Pagination } from '@/apis/types/models';
import type { SysPost, SearchPostDto } from '@/apis/types/system/post';

/**
 * 查询岗位列表
 */
export function listPost(params: SearchPostDto) {
  return request<Pagination<SysPost>>('/system/post/list', {
    method: RequestEnum.GET,
    params,
  });
}
