import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { default as createSmartAppBanner } from './smartAppBannerPlugin';
import type { SmartBannerOptions } from 'smart-app-banner';

createApp(App)
    .use(createSmartAppBanner, {
        title: 'Hello world!',
        author: 'Albert Ferguson',
        // using the create-vue asset logo
        icon: '/src/assets/logo.svg',
        verbose: true,
        googlePlayStoreUrl: 'https://play-store-application-url',
        appStoreUrl: 'https://app-store-application-url',
    } as SmartBannerOptions)
    .mount('#app');
