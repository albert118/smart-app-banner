import type { App, InjectionKey } from 'vue';
import { SmartAppBanner, type SmartBannerOptions } from 'smart-app-banner';
import 'smart-app-banner/style.css';
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
            app.provide(SmartAppBannerInjectionKey, instance);
        } else {
            Logger.warn(
                'failed to initialise the plugin, check the logs for further details',
            );
        }
    },
};
