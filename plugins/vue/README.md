# SmartAppBanner - Vue Plugin

> TODO

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
```
