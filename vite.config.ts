import { defineConfig } from 'vite';
import tsconfig from './tsconfig.app.json';
import path from 'path';

// https://vite.dev/config/
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
});
