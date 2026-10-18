import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            globals: true,
            environment: 'happy-dom',
            exclude: [...configDefaults.exclude, 'plugins/**', 'demo/**'],
            silent: false,
            setupFiles: ['./vitest.setup.ts'],
            root: fileURLToPath(new URL('./', import.meta.url)),
        },
    }),
);
