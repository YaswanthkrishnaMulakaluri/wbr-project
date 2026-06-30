import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: env.PORT ? parseInt(env.PORT) : 3001,
      proxy: {
        '/api/wbi': {
          target: env.OPS_BACKEND_URL,
          changeOrigin: true,
        },
        '/login/azure/callback': {
          target: env.OPS_BACKEND_URL,
          changeOrigin: true,
        },
      },
      hmr: env.DISABLE_HMR !== 'true',
      watch: env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});