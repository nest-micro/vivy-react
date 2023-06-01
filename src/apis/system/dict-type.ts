import { request } from '@umijs/max';
import { RequestEnum } from '@/enums/httpEnum';
import type { Pagination } from '@/apis/types/models';
import type { SysDictType, SearchDictTypeDto } from '@/apis/types/system/dict-type';

/**
 * 查询字典类型列表
 */
export function listDictType(params: SearchDictTypeDto) {
  return request<Pagination<SysDictType>>('/system/dict/type/list', {
    method: RequestEnum.GET,
    params,
  });
}