import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sassPlugin from 'vite-plugin-sass';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    sassPlugin({
      includePaths: ['./src/sass'],  // Adjust to your actual SASS folder path
      outputStyle: 'expanded',      // Options: nested, expanded, compact, compressed
      sass: {
        precision: 5,
        sourceMap: true,
      },
    }),
  ],
});
