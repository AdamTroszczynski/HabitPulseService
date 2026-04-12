// server/tsup.config.ts
import { defineConfig } from 'tsup';
import { resolve } from 'node:path';

export default defineConfig({
  entry: ['server/src/server.ts'],
  format: ['esm'],
  outDir: 'dist',
  tsconfig: 'tsconfig.json',
  external: [
    // wszystkie node_modules jako external - nie bundluj ich
    /node_modules/,
  ],
  esbuildOptions(options) {
    options.alias = {
      '@shared': resolve('../shared'),
      '@': resolve('./src'),
    };
  },
});
