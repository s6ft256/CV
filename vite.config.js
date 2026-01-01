import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages: use a relative base and output to `docs/` so the built
// site can be served from the repository's `main` branch -> /docs folder.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'docs',
    emptyOutDir: true
  },
  server: {
    port: 5173
  }
})
