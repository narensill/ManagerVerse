import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@ffmpeg/ffmpeg', 'styled-components'],
  },
  build: {
    outDir: 'dist', // Change back to 'dist' as Vercel expects this
    emptyOutDir: true,
    rollupOptions: {
      external: ['jszip', 'styled-components'],
      output: {
        format: 'es',
      },
    },
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@utils': '/src/utils',
    },
  },
});
