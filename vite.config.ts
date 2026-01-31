import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    // Base path for GitHub Pages user site (thngo.github.io)
    // Always use '/' for user/organization pages
    base: '/',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      css: true,
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html', 'lcov'],
        exclude: [
          'node_modules/',
          'src/setupTests.ts',
          '**/*.test.{ts,tsx}',
          '**/__tests__/**',
          'dist/',
          'vite.config.ts',
          'eslint.config.js',
          'tailwind.config.js',
          'postcss.config.js',
        ],
      },
    },
  };
});
