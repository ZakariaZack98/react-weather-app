import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/news': {
        target: 'http://localhost:5173/api',
        changeOrigin: true,
        configure: (proxy, options) => {
          console.log('Using local API route for news');
        }
      }
    }
  }
});
