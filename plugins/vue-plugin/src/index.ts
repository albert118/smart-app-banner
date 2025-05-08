import Logger from 'js-logger';

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

// TODO:
// // import and re-export styles from original module
// /**
//  * @internal
//  */
// import 'smart-app-banner/style.css';
// /**
//  * @internal
//  */
// import 'smart-app-banner/dist/style.scss';
// /**
//  * @internal
//  */
// import 'smart-app-banner/dist/variables.scss';
