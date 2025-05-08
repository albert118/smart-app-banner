import { defineConfig } from 'vite';
import tsconfig from './tsconfig.app.json';
import path from 'path';
import packageJson from './package.json';
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
                    src: 'src/styles/styles.scss',
                    dest: 'dist',
                },
                {
                    src: 'src/styles/variables.scss',
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
            name: packageJson.name,
            formats: ['es'],
            fileName: packageJson.name,
            cssFileName: 'styles',
        },
    },
    resolve: {
        alias: Object.fromEntries(
            Object.entries(tsconfig.compilerOptions.paths).map(
                ([key, value]) => [
                    key.replace('/*', ''),
                    normalizePath(
                        path.resolve(__dirname, value[0].replace('/*', '')),
                    ),
                ],
            ),
        ),
    },
});
