import { defineConfig } from 'dumi';
import { resolve } from 'path';

export default defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/dp-react/' : '/',
  base: process.env.NODE_ENV === 'production' ? '/dp-react/' : '/',
  // exportStatic: {}, // 暂不兼容 Windows 系统
  hash: true,
  title: 'dp-react',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  alias: {
    '@': resolve(__dirname, './src'),
  },
  proxy: {
    '/core': {
      target: 'https://sit.miaocode.com',
      changeOrigin: true,
      pathRewrite: {
        '^/core': '/core',
      },
    },
  },
  // more config: https://d.umijs.org/config
});
