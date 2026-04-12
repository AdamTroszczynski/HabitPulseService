// worker/tsup.config.ts
import { defineConfig } from 'tsup';
import { resolve } from 'node:path';

export default defineConfig({
  entry: ['worker/src/worker.ts'],
  format: ['esm'],
  outDir: 'dist',
  tsconfig: 'tsconfig.json',
  external: [/node_modules/],
  esbuildOptions(options) {
    options.alias = {
      '@shared': resolve('../shared'),
      '@': resolve('./src'),
    };
  },
});
