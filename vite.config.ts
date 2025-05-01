import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Add babel plugins or presets here if needed
      babel: {
        plugins: [],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5173,
    host: true,
    strictPort: true,
    open: true,
  },
});
