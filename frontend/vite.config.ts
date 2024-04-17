import react from '@vitejs/plugin-react';

import * as path from 'path';
export default {
  plugins: [react()],
  resolve: {
    alias: {
      '@ui': path.resolve('./src/ui'),
      '@utils': path.resolve('./src/utils'),
      '@hooks': path.resolve('./src/hooks'),
      '@router': path.resolve('./src/router'),
      '@api': path.resolve('./src/api'),
      '@ts': path.resolve('./src/types'),
      '@components': path.resolve('./src/components'),
      '@store': path.resolve('./src/store'),
    },
  },
  server: {
    cors: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
    // Optionally configure proxy settings if needed
    // proxy: {
    //   '/backend': {
    //     changeOrigin: true,
    //     target: backendEnvList[selectedBackendEnv],
    //     rewrite: path => path.replace(/^\/backend/, ''),
    //   },
    // },
    // host: true,
    port: 5173,
    open: true,
  },
};
