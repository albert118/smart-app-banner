# SmartAppBanner - Vue Plugin

[![NPM version](https://img.shields.io/npm/v/smart-app-banner?color=a1b858&label=)](https://www.npmjs.com/package/smart-app-banner) [![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

A Vue Plugin for [Smart App Banner](https://github.com/albert118/smart-app-banner).

## Install

```sh
npm i -S smart-app-banner-vue-plugin
```

---

## Usage

```ts
// main.ts
import { createApp } from 'vue';
import { createSmartAppBanner, SmartAppBannerOptions } from 'smart-app-banner/vue-plugin';
import App from './App.vue';

createApp(App)
  .use(createSmartAppBanner, {
    title: 'Hello world!',
    author: 'Albert Ferguson',
    // using the create-vue asset logo
    icon: './logo.svg',
    verbose: true,
    googlePlayStoreUrl: 'https://play-store-application-url',
    appStoreUrl: 'https://app-store-application-url',
  } as SmartBannerOptions)
  .mount('#app');


// App.vue
<script setup lang=ts>
import { useSmartAppBanner } from 'smart-app-banner/vue-plugin';
const smartAppBanner = useSmartAppBanner()

try {
    // try-mount the component
    smartAppBanner.mount();
} catch (error) {
    console.error(error);
}
</script>
```

For more on configuration, see the [Smart App Banner](https://github.com/albert118/smart-app-banner) repository.

## Development

To get started, pull the repo and run a build as well as the tests.

> don't forget to run `npm i`!

```ts
npm run build
npm run test
```

You can checkout the rest of the commands in the [package.json](./package.json).

The next step would be to boot up the dependent project, as you're probably looking to edit it too. See [here](https://github.com/albert118/smart-app-banner).

## Licence

[MIT](./LICENSE) License © 2025-PRESENT [Albert Ferguson](https://github.com/albert118/)
