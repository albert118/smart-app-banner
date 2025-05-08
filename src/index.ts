import Logger from 'js-logger';
import * as events from './data/events';

// ensure extensions are implemented
import '@utils/stringUtils';

Logger.useDefaults({
    // default to warning until we disable it with options
    defaultLevel: Logger.WARN,
    formatter: function (messages, context) {
        messages.unshift('[🛍️ Smart App Banner]');
    },
});

export type { SmartBannerOptions, ParsedSmartBannerOptions } from '@models';
export { DEFAULT_OPTIONS, OPTION_PARSERS } from '@data/options';
export { SmartAppBanner } from './smartappbanner';
export { events };

/**
 * @internal
 */
import './styles/styles.scss';
