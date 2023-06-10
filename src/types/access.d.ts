/**
 * 角色权限
 * @access 从角色表生成
 */
declare type AccessRole = 'admin' | 'common';

/**
 * 权限码权限
 * @access 从菜单表生成
 */
declare type AccessPermission =
  | 'system:user:query'
  | 'system:user:add'
  | 'system:user:edit'
  | 'system:user:remove'
  | 'system:user:export'
  | 'system:user:import'
  | 'system:user:resetPwd'
  | 'system:role:query'
  | 'system:role:add'
  | 'system:role:edit'
  | 'system:role:remove'
  | 'system:role:export'
  | 'system:menu:query'
  | 'system:menu:add'
  | 'system:menu:edit'
  | 'system:menu:remove'
  | 'system:dept:query'
  | 'system:dept:add'
  | 'system:dept:edit'
  | 'system:dept:remove'
  | 'system:post:query'
  | 'system:post:add'
  | 'system:post:edit'
  | 'system:post:remove'
  | 'system:post:export'
  | 'system:dict:query'
  | 'system:dict:add'
  | 'system:dict:edit'
  | 'system:dict:remove'
  | 'system:dict:export'
  | 'system:config:query'
  | 'system:config:add'
  | 'system:config:edit'
  | 'system:config:remove'
  | 'system:config:export'
  | 'system:operlog:query'
  | 'system:operlog:remove'
  | 'system:operlog:export'
  | 'system:loginlog:query'
  | 'system:loginlog:remove'
  | 'system:loginlog:export';
