import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { createSmartAppBanner } from '@easy-smart-app-banner/vue-plugin';
import { type SmartBannerOptions } from '@easy-smart-app-banner/core';

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
