import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig, loadEnv } from 'vite';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const ROOT_DIR = path.resolve(import.meta.dirname, '..');
  const env = loadEnv(mode, ROOT_DIR, '');

  return {
    plugins: [svelte()],
    envDir: ROOT_DIR,
    server: {
      proxy: {
        '/api': 'http://localhost:' + env.PORT,
      },
    },
  };
});
