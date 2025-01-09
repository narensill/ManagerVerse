import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@ffmpeg/ffmpeg'], // Pre-bundle FFmpeg for optimization
  },
  build: {
    outDir: 'build', // Set the output directory for the build files
    emptyOutDir: true, // Clears the build folder before building
    rollupOptions: {
      external: ['jszip'], // Mark jszip as an external module
      output: {
        format: 'es', // Ensure ES module format for compatibility
      },
    },
  },
  resolve: {
    alias: {
      '@components': '/src/components', // Example alias for components
      '@utils': '/src/utils', // Example alias for utilities
    },
  },
});
