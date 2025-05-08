import type { App, InjectionKey } from 'vue';
import { SmartAppBanner, type SmartBannerOptions } from 'smart-app-banner';
import Logger from 'js-logger';

Logger.useDefaults({
    // default to warning until we disable it with options
    defaultLevel: Logger.WARN,
    formatter: function (messages, context) {
        messages.unshift('[🛍️ Smart App Banner - Plugin]');
    },
});

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

export default {
    install(app: App, options: SmartBannerOptions) {
        let instance: SmartAppBanner | undefined = undefined;

        try {
            instance = new SmartAppBanner(options);
        } catch (error) {
            Logger.warn(error);
        }

        if (instance) {
            app.config.globalProperties.$smartAppBanner = instance;
        } else {
            Logger.warn(
                'failed to initialise the plugin, check the logs for further details',
            );
        }
    },
};
