import { defineConfig } from 'vite';
import tsconfig from './tsconfig.app.json';
import path from 'path';
import packageJson from './package.json';
import dts from 'vite-plugin-dts';
import stripComments from 'vite-plugin-strip-comments';
import { viteStaticCopy } from 'vite-plugin-static-copy';
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
        viteStaticCopy({
            targets: [
                // TODO: Make this copy work
                // Sass/Scss
                {
                    src: normalizePath(
                        path.resolve(__dirname, 'src/styles/styles.scss'),
                    ),
                    dest: `.`,
                    transform: () => `${packageJson.name}.scss`,
                },
                // meta
                {
                    src: normalizePath(path.resolve(__dirname, 'LICENSE')),
                    dest: `.`,
                },
                {
                    src: normalizePath(path.resolve(__dirname, 'README.md')),
                    dest: `.`,
                },
                {
                    src: normalizePath(path.resolve(__dirname, 'package.json')),
                    dest: `.`,
                },
            ],
        }),
    ],
    build: {
        sourcemap: true,
        lib: {
            entry: normalizePath(path.resolve(__dirname, 'src/index.ts')),
            name: packageJson.name,
            formats: ['es'],
            fileName: packageJson.name,
            cssFileName: packageJson.name,
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
