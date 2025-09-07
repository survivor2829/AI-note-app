import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'https://openrouter.ai/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          headers: {
            Authorization: `Bearer ${env.VITE_OPENROUTER_API_KEY}`,
          },
        },
        '/tavily': {
          target: 'https://api.tavily.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/tavily/, ''),
        },
      },
    },
  }
})
