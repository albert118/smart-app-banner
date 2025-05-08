import type { SmartAppBanner, SmartBannerOptions } from 'smart-app-banner';
import type { App } from 'vue';
import Logger from 'js-logger';
import { SmartAppBannerInjectionKey } from './useSmartAppBanner';

// re-export for convenience
export { SmartAppBanner, type SmartBannerOptions } from 'smart-app-banner';

export default {
    install(app: App, options: SmartBannerOptions) {
        Logger.useDefaults({
            // default to warning until we disable it with options
            defaultLevel: Logger.WARN,
            formatter: function (messages, context) {
                messages.unshift('[🛍️ Smart App Banner - Plugin]');
            },
        });

        let instance: SmartAppBanner | undefined = undefined;

        try {
            instance = new SmartAppBanner(options);
        } catch (error) {
            Logger.warn(error);
        }

        if (instance) {
            app.config.globalProperties.$smartAppBanner = instance;
            app.provide(SmartAppBannerInjectionKey, instance);
        } else {
            Logger.warn(
                'Failed to initialise the plugin! Check the logs for further details',
            );
        }
    },
};
