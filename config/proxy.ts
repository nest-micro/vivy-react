/**
 * @name 代理的配置
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  '/api/': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  },
};
