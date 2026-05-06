import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const here = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  base: './',
  resolve: {
    alias: {
      '@': resolve(here, 'src'),
    },
  },
  plugins: [
    react(),
    // Bundle analyzer - generates stats.html
    visualizer({
      filename: '../stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    outDir: '../',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
})
