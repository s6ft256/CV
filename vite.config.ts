import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { VitePWA } from 'vite-plugin-pwa'
import imagemin from 'vite-plugin-imagemin'

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
    // Image optimization
    imagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9] },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'removeEmptyAttrs',
            active: true,
          },
        ],
      },
    }),
    // PWA support for offline functionality
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'Elius Niwamanya - Full-Stack Developer',
        short_name: 'Elius CV',
        description:
          'Professional CV website for Elius Niwamanya - Full-Stack Developer & IOSH-Certified HSE Personnel',
        theme_color: '#071228',
        background_color: '#071228',
        display: 'standalone',
        icons: [
          {
            src: '/Profile.jpeg',
            sizes: '192x192',
            type: 'image/jpeg',
          },
          {
            src: '/Profile.jpeg',
            sizes: '512x512',
            type: 'image/jpeg',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\.github\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'github-api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
    // Bundle analyzer - generates stats.html
    visualizer({
      filename: '../stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
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
