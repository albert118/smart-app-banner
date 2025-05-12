import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';
import stripComments from 'vite-plugin-strip-comments';
import copy from 'rollup-plugin-copy';
import { normalizePath } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        // https://www.npmjs.com/package/vite-plugin-dts
        dts({
            rollupTypes: true,
            tsconfigPath: './tsconfig.app.json',
        }),
        // https://github.com/thednp/vite-plugin-strip-comments
        stripComments({ type: 'keep-legal' }),
        // https://www.npmjs.com/package/vite-plugin-static-copy
        copy({
            targets: [
                // meta
                {
                    src: './LICENSE',
                    dest: `dist`,
                },
                {
                    src: './README.md',
                    dest: `dist`,
                },
                {
                    src: './package.json',
                    dest: `dist`,
                },
                // SCSS/Sass
                {
                    src: './node_modules/@easy-smart-app-banner/core/dist/styles.scss',
                    dest: 'dist',
                },
                {
                    src: './node_modules/@easy-smart-app-banner/core/dist/variables.scss',
                    dest: 'dist',
                },
            ],
            // ensure it runs after bundle is written
            hook: 'writeBundle',
        }),
    ],
    build: {
        sourcemap: true,
        lib: {
            entry: normalizePath(path.resolve(__dirname, 'src/index.ts')),
            formats: ['es'],
            fileName: 'index',
            cssFileName: 'styles',
        },
    },
});
