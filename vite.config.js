import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@ffmpeg/ffmpeg'], // Ensure FFmpeg is pre-bundled
  },
  build: {
    rollupOptions: {
      output: {
        // Ensure ES modules are handled properly
        format: 'es',
      },
    },
  },
  resolve: {
    alias: {
      // If necessary, alias paths for compatibility
    },
  },
});
