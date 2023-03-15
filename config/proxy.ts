/**
 * @name 代理的配置
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  '/api/': {
    target: 'http://vue.ruoyi.vip/prod-api',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
};
