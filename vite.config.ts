import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/india-agri-converter/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false
  }
});
