import { defineConfig } from 'vite';
import tsconfig from './tsconfig.app.json';
import path from 'path';
import packageJson from './package.json';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        // https://www.npmjs.com/package/vite-plugin-dts
        dts({
            rollupTypes: true,
            tsconfigPath: './tsconfig.app.json',
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
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
                    path.resolve(__dirname, value[0].replace('/*', '')),
                ],
            ),
        ),
    },
});
