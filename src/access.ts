/**
 * @name Access 在这里按照初始化数据定义项目中的权限，统一管理
 * @doc https://umijs.org/docs/max/access
 */
export default (initialState: API.UserInfo) => {
  const canSeeAdmin = !!(
    initialState && initialState.name !== 'dontHaveAccess'
  );

  return {
    canSeeAdmin,
  };
};
