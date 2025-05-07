import { fileURLToPath } from 'node:url';
import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'happy-dom',
        exclude: [...configDefaults.exclude],
        silent: false,
        setupFiles: ['./vitest.setup.ts'],
        root: fileURLToPath(new URL('./', import.meta.url)),
    },
});
