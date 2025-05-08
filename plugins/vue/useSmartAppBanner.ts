import type { SmartAppBanner } from 'smart-app-banner';

export const SmartAppBannerInjectionKey = Symbol(
    'SmartAppBanner',
) as InjectionKey<SmartAppBanner>;

export function useSmartAppBanner() {
    const instance = inject(SmartAppBannerInjectionKey);

    if (!instance) {
        // see more here for in-depth, but usually this is as the error describes
        // https://antfu.me/posts/async-with-composition-api
        throw new Error(
            'No Smart App Banner instance was provided! Double check that the Smart App Banner plugin has been registered and that the service is not called within an async setup',
        );
    }

    return instance;
}
