import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  // 資料夾別名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // eslint 格式化套件
  plugins: [vue(), eslintPlugin()],
})
