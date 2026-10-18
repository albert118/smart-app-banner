import { defineConfig } from 'vite';
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
            bundleTypes: true,
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
                    src: './node_modules/@easy-smart-app-banner/core/dist/styles.scss',
                    dest: '.',
                    rename: { stripBase: true },
                },
                {
                    src: './node_modules/@easy-smart-app-banner/core/dist/variables.scss',
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
        rolldownOptions: {
            // vue is a peer dependency, the host app provides it
            external: ['vue'],
        },
    },
});
