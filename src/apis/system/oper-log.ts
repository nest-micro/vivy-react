import { request } from '@umijs/max';
import { RequestEnum } from '@/enums/httpEnum';
import type { Pagination } from '@/apis/types/models';
import type { SysOperLog, SearchOperLogDto } from '@/apis/types/system/oper-log';

/**
 * 查询操作日志列表
 */
export function listOperLog(params: SearchOperLogDto) {
  return request<Pagination<SysOperLog>>('/system/oper/log/list', {
    method: RequestEnum.GET,
    params,
  });
}
