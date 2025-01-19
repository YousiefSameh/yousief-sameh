import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import { imagetools } from 'vite-imagetools';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from "vite-plugin-svgr";

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
    svgr(),
  ],

  build: {
    target: 'esnext',
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          reactIcons: ['react-icons'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: true,
      mangle: true,
      format: {
        comments: false,
      },
    },
  },

  server: {
    port: 5234,
    open: true,
    cors: true,
  },

  assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf'],

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-icons'],
  },
});