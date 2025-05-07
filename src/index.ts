import Logger from 'js-logger';
import * as events from './data/events';

Logger.useDefaults({
    // default to warning until we disable it with options
    defaultLevel: Logger.WARN,
    formatter: function (messages, context) {
        messages.unshift('[🛍️ Smart App Banner]');
    },
});

export type { SmartBannerOptions } from '@models';
export { SmartAppBanner } from './smartappbanner';

export { events };
