import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define:{
    global: 'window',
  },
  server: {
    port: 4000,
    proxy: {
      '/api': {
        target: 'https://fashion-web-deoh.onrender.com', 
        changeOrigin: true,
      },
      '/community': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
