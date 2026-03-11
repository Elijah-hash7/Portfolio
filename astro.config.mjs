// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
        '@icons': new URL('./src/components/icons', import.meta.url).pathname
      }
    },
    plugins: [tailwindcss()],
    define: {
      global: 'globalThis'
    },
    server: {
      hmr: {
        overlay: false
      }
    },
    build: {
      minify: false
    },
    esbuild: {
      jsx: 'automatic'
    }
  }
});
