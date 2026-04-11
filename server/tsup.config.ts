import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['esm'],
  outDir: 'dist/src',
  bundle: false,
  tsconfig: 'tsconfig.json',
});
