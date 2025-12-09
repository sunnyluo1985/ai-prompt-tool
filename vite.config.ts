import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // 映射 Cloudflare 的 VITE_API_KEY 环境变量到 process.env.API_KEY
    // 这样我们就不需要修改前端代码中的 process.env.API_KEY 写法
    'process.env.API_KEY': JSON.stringify(process.env.VITE_API_KEY || process.env.API_KEY)
  }
});