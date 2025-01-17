import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { imagetools } from 'vite-imagetools';
import removeConsole from 'vite-plugin-remove-console';
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),

    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
    }),

    imagetools(),
    tsconfigPaths(),

    removeConsole({
      includes: ['**/*.js', '**/*.ts'],
    }),
  ],

  build: {
    target: 'esnext',
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        },
      },
    },
    minify: 'terser',
  },

  server: {
    port: 5234,
    open: true,
    cors: true,
  },

  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf'],

  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
