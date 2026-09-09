import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    root: './',
    include: ['**/*.spec.ts'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        'dist/**',
        'test/**',
        'src/main.ts',
        'src/**/*.module.ts',
        'src/**/*.dto.ts',
        'src/**/*-orm.entity.ts',
        'src/**/*.entity.ts',
        'src/**/*.mapper.ts',
        'src/shared/domain/errors/**',
        'src/database/migrations/**',
        'src/**/index.ts',
        'src/**/*.spec.ts',
        'src/**/*.integration.spec.ts'
      ],
    },
  },
});
