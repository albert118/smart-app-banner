import { fileURLToPath } from 'node:url';
import { defineConfig, configDefaults } from 'vitest/config';
import path from 'node:path';
import tsconfig from './tsconfig.app.json';

export default defineConfig({
    resolve: {
        alias: Object.fromEntries(
            Object.entries(tsconfig.compilerOptions.paths).map(
                ([key, value]) => [
                    key.replace('/*', ''),
                    path.resolve(__dirname, value[0].replace('/*', '')),
                ],
            ),
        ),
    },
    test: {
        globals: true,
        environment: 'happy-dom',
        exclude: [...configDefaults.exclude],
        silent: false,
        setupFiles: ['./vitest.setup.ts'],
        root: fileURLToPath(new URL('./', import.meta.url)),
    },
});
