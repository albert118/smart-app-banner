import Logger from 'js-logger';
export * from '@easy-smart-app-banner/core';

Logger.useDefaults({
    defaultLevel: Logger.WARN,
    formatter: function (messages, context) {
        messages.unshift('[🛍️ Smart App Banner - Plugin]');
    },
});

import { default as SmartAppBannerPlugin } from './smartAppBannerPlugin';

export { useSmartAppBanner } from './useSmartAppBanner';
export { SmartAppBannerInjectionKey } from './smartAppBannerPlugin';

export default SmartAppBannerPlugin;

/**
 * @internal
 */
import '@easy-smart-app-banner/core/style.css';
/**
 * @internal
 */
import '@easy-smart-app-banner/core/style.scss';
/**
 * @internal
 */
import '@easy-smart-app-banner/core/variables.scss';
