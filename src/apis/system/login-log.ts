import { request } from '@umijs/max';
import { RequestEnum } from '@/enums/httpEnum';
import type { Pagination } from '@/apis/types/models';
import type { SysLoginLog, SearchLoginLogDto } from '@/apis/types/system/login-log';

/**
 * 查询登录日志列表
 */
export function listLoginLog(params: SearchLoginLogDto) {
  return request<Pagination<SysLoginLog>>('/system/login/log/list', {
    method: RequestEnum.GET,
    params,
  });
}
