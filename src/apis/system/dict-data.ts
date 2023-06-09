import { request } from '@umijs/max';
import { RequestEnum } from '@/enums/httpEnum';
import type { Pagination } from '@/apis/types/models';
import type { SysDictData, ListDictDataDto } from '@/apis/types/system/dict-data';

/**
 * 查询字典数据列表
 */
export function listDictData(params: Partial<ListDictDataDto>) {
  return request<Pagination<SysDictData>>('/system/dict/data/list', {
    method: RequestEnum.GET,
    params,
  });
}

/**
 * 根据字典类型查询字典数据列表
 */
export function getDictDataList(type: string) {
  return request<SysDictData[]>(`/system/dict/data/options/${type}`, {
    method: RequestEnum.GET,
  });
}
