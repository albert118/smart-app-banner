<script setup lang="ts">
import Logger from 'js-logger';
import HelloWorld from '@components/HelloWorld.vue';
import TheWelcome from '@components/TheWelcome.vue';
import { useSmartAppBanner } from '@easy-smart-app-banner/vue-plugin';

Logger.useDefaults();
var demoLogger = Logger.get('Demo');
demoLogger.setLevel(Logger.DEBUG);

const smartAppBanner = useSmartAppBanner();

try {
    // mount the component
    smartAppBanner.mount();
    demoLogger.info('demo will now attempt to mount the banner');
} catch (error) {
    // catch any errors gracefully if there's any config or platform issues
    demoLogger.error(error);
}
</script>

<template>
    <header>
        <img
            alt="Vue logo"
            class="logo"
            src="./assets/logo.svg"
            width="125"
            height="125"
        />

        <div class="wrapper">
            <HelloWorld msg="You did it!" />
        </div>
    </header>

    <main>
        <TheWelcome />
    </main>
</template>

<style scoped>
header {
    line-height: 1.5;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>
