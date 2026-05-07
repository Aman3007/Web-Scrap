import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
       target: 'https://web-scrap-backend-w1d1.onrender.com',
        changeOrigin: true,
      },
    },
  },
})
