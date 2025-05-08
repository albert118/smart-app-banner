import tsconfig from './tsconfig.app.json';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        AutoImport({
            include: [
                /\.[tj]s?$/, // .ts / .js
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\/.md$/, // .md
            ],
            dts: './src/types/auto-import.d.ts',
            imports: ['vue', 'vitest'],
            vueTemplate: true,
        }),
        vue(),
        // enable if needed - but this can block the banner
        // vueDevTools(),
    ],
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
});
