import { defineConfig } from 'vite';
import tsconfig from './tsconfig.app.json';
import path from 'path';
import dts from 'vite-plugin-dts';
import stripComments from 'vite-plugin-strip-comments';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { normalizePath } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        // https://www.npmjs.com/package/vite-plugin-dts
        dts({
            entryRoot: 'src',
            insertTypesEntry: true,
            tsconfigPath: './tsconfig.app.json',
        }),
        // https://github.com/thednp/vite-plugin-strip-comments
        stripComments({ type: 'keep-legal' }),
        // https://www.npmjs.com/package/vite-plugin-static-copy
        viteStaticCopy({
            targets: [
                // meta
                {
                    src: './LICENSE',
                    dest: '.',
                    rename: { stripBase: true },
                },
                {
                    src: './README.md',
                    dest: '.',
                    rename: { stripBase: true },
                },
                {
                    src: './package.json',
                    dest: '.',
                    rename: { stripBase: true },
                },
                // SCSS/Sass
                {
                    src: 'src/styles/styles.scss',
                    dest: '.',
                    rename: { stripBase: true },
                },
                {
                    src: 'src/styles/variables.scss',
                    dest: '.',
                    rename: { stripBase: true },
                },
            ],
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
