# Easy Smart App Banner - Vue Plugin

[![NPM version](https://img.shields.io/npm/v/smart-app-banner?color=e3e023&label=%22Easy%20Smart%20App%20Banner%22)](https://www.npmjs.com/package/@easy-smart-app-banner/core) [![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A Vue Plugin for [Smart App Banner](https://github.com/albert118/smart-app-banner).

## Install

```sh
npm i -S @easy-smart-app-banner/vue-plugin
```

---

## Usage

```ts
// main.ts
import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { default as createSmartAppBanner } from '@easy-smart-app-banner/vue-plugin';
import { type SmartBannerOptions } from '@easy-smart-app-banner/core';
import '@easy-smart-app-banner/core/style.css';

createApp(App)
    .use(createSmartAppBanner, {
        title: 'Hello world!',
        author: 'Albert Ferguson',
        // using the create-vue asset logo (any image is valid!)
        icon: '/src/assets/logo.svg',
        // optionally enable verbose logging - this is disabled by default
        verbose: true,
        googlePlayStoreUrl: 'https://play-store-application-url',
        appStoreUrl: 'https://app-store-application-url',
    } as SmartBannerOptions)
    .mount('#app');



// App.vue
<script setup lang="ts">
import { useSmartAppBanner } from '@easy-smart-app-banner/vue-plugin';

const smartAppBanner = useSmartAppBanner();

try {
    // mount the component
    smartAppBanner.mount();
} catch (error) {
    // catch any errors gracefully if there's any config or platform issues
    console.error(error);
}
</script>
```

For more on configuration, see the [Smart App Banner](https://github.com/albert118/smart-app-banner) repository.

## Development

To get started, pull the repo and run a build.

> don't forget to run `npm i`!

```ts
npm run build
```

You can checkout the rest of the commands in the [package.json](./package.json).

The next step would be to boot up the dependent project, as you're probably looking to edit it too. See [here](https://github.com/albert118/smart-app-banner).

## Licence

[MIT](./LICENSE) License © 2025-PRESENT [Albert Ferguson](https://github.com/albert118/)
