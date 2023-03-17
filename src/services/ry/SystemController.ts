import { request } from '@umijs/max';
import { RequestEnum } from '@/enums/httpEnum';
import { listToTree } from '@/utils/tree';

// 查询用户列表
export function listUser(params: API.Indexable) {
  return request('/system/user/list', {
    method: RequestEnum.GET,
    params,
  });
}

// 查询用户详细
export function getUser(userId: string) {
  return request('/system/user/' + userId, {
    method: RequestEnum.GET,
  });
}

// 查询角色列表
export function listRole(params: API.Indexable) {
  return request('/system/role/list', {
    method: RequestEnum.GET,
    params,
  });
}

// 查询角色详细
export function getRole(roleId: string) {
  return request('/system/role/' + roleId, {
    method: RequestEnum.GET,
  });
}

// 查询菜单列表
export function listMenu(params: API.Indexable) {
  return request('/system/menu/list', {
    method: RequestEnum.GET,
    params,
  }).then((res) => {
    res.data = listToTree(res.data, {
      id: 'menuId',
      pid: 'parentId',
      children: 'children',
    });
    return res;
  });
}

// 查询菜单详细
export function getMenu(menuId: string) {
  return request('/system/menu/' + menuId, {
    method: RequestEnum.GET,
  });
}

// 查询部门列表
export function listDept(params: API.Indexable) {
  return request('/system/dept/list', {
    method: RequestEnum.GET,
    params,
  }).then((res) => {
    res.data = listToTree(res.data, {
      id: 'deptId',
      pid: 'parentId',
      children: 'children',
    });
    return res;
  });
}

// 查询部门详细
export function getDept(deptId: string) {
  return request('/system/dept/' + deptId, {
    method: RequestEnum.GET,
  });
}

// 查询岗位列表
export function listPost(params: API.Indexable) {
  return request('/system/post/list', {
    method: RequestEnum.GET,
    params,
  });
}

// 查询岗位详细
export function getPost(postId: string) {
  return request('/system/post/' + postId, {
    method: RequestEnum.GET,
  });
}

// 查询字典类型列表
export function listDict(params: API.Indexable) {
  return request('/system/dict/type/list', {
    method: RequestEnum.GET,
    params,
  });
}

// 根据字典类型查询字典数据信息
export function getDict(dictType: string) {
  return request('/system/dict/data/type/' + dictType, {
    method: RequestEnum.GET,
  });
}

// 查询操作日志列表
export function listOperlog(params: API.Indexable) {
  return request('/monitor/operlog/list', {
    method: RequestEnum.GET,
    params,
  });
}

// 查询登录日志列表
export function listLogininfor(params: API.Indexable) {
  return request('/monitor/logininfor/list', {
    method: RequestEnum.GET,
    params,
  });
}
