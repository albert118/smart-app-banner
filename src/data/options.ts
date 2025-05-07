import {
    SmartAppBannerError,
    type ParsedSmartBannerOptions,
    type SmartBannerOptions,
} from '@models';
import { getOptionsParser, type OptionParsers } from '@utils/optionsParser';
import Logger from 'js-logger';

/**
 * Default options
 */
export const DEFAULT_OPTIONS: Required<ParsedSmartBannerOptions> = {
    title: '',
    author: '',
    icon: '',
    platforms: ['android', 'ios'],
    price: 'free',
    buttonLabel: 'View',
    verbose: false,

    // --------------------------------------------
    // Android Platform Options
    playStoreUrl: null,
    androidButtonLabel: null,

    // --------------------------------------------
    // Apple Platform Options
    appStoreUrl: null,
    appleAppId: null,
    appleAppArgumentUrl: null,
    appleButtonLabel: null,
};

export const OPTION_PARSERS: OptionParsers<
    SmartBannerOptions,
    ParsedSmartBannerOptions
> = {
    title: title => {
        if (title.isFalsishOrEmpty()) {
            throw new SmartAppBannerError('No title has been configured.');
        }

        return title;
    },
    author: author => {
        if (author.isFalsishOrEmpty()) {
            throw new SmartAppBannerError('No author has been configured.');
        }

        return author;
    },
    icon: icon => {
        if (icon.isFalsishOrEmpty()) {
            throw new SmartAppBannerError('No icon has been configured.');
        }

        return icon;
    },
    platforms: (platforms, { defaultValue }) => {
        if (!platforms || platforms.length === 0) return defaultValue;
        return platforms;
    },
    price: (price, { defaultValue }) => {
        if (!price) {
            return defaultValue;
        } else if (typeof price === 'number' && price < 0) {
            throw new SmartAppBannerError(
                'An invalid price has been configured. Price should be non-negative.',
            );
        } else if (typeof price === 'number' && price === 0) {
            throw new SmartAppBannerError(
                'An invalid price has been configured. If price is configure as "0" then you should prefer the "free" option.',
            );
        }

        return price;
    },
    buttonLabel: (buttonLabel, { defaultValue }) => {
        if (buttonLabel?.isFalsishOrEmpty()) return defaultValue;
        // we have already asserted that the param is not undefined
        return buttonLabel!;
    },
    verbose: (verbose, { defaultValue }) => {
        if (!verbose) return defaultValue;
        Logger.debug('verbose logging enabled');
        // we have already asserted that the param is not undefined
        return verbose!;
    },
    // --------------------------------------------
    // Android Platform Options
    playStoreUrl: (playStoreUrl, { rawOptions }) => {
        if (!rawOptions.platforms.includes('android')) return null;

        const reason = `Android platform was enabled but no valid Google Play Store URL has been configured. Provided URL was "${playStoreUrl}"`;
        if (playStoreUrl?.isFalsishOrEmpty()) {
            throw new SmartAppBannerError(reason);
        }

        try {
            // we have already asserted that the param is not undefined
            const x = new URL(playStoreUrl!);
            return x;
        } catch (error) {
            throw new SmartAppBannerError(reason);
        }
    },
    androidButtonLabel: (androidButtonLabel, { rawOptions }) => {
        if (!rawOptions.platforms.includes('android')) return null;
        return androidButtonLabel ?? null;
    },
    // --------------------------------------------
    // Apple Platform Options
    appStoreUrl: (appStoreUrl, { rawOptions }) => {
        if (!rawOptions.platforms.includes('ios')) return null;

        const reason = `iOS platform was enabled but no valid Apple App Store URL has been configured. Provided URL was "${appStoreUrl}"`;
        if (appStoreUrl?.isFalsishOrEmpty()) {
            throw new SmartAppBannerError(reason);
        }

        try {
            // we have already asserted that the param is not undefined
            return new URL(appStoreUrl!);
        } catch (error) {
            throw new SmartAppBannerError(reason);
        }
    },
    appleAppId: (appleAppId, { rawOptions }) => {
        if (!rawOptions.platforms.includes('safari')) return null;

        if (appleAppId?.isFalsishOrEmpty()) {
            throw new SmartAppBannerError(
                `Safari platform was enabled but no valid Apple app ID has been configured. Provided app ID was "${appleAppId}"`,
            );
        }

        // we have already asserted that the param is not undefined
        return appleAppId!;
    },
    appleAppArgumentUrl: (appleAppArgumentUrl, { rawOptions }) => {
        if (!rawOptions.platforms.includes('safari')) return null;
        // this param is optional, if it wasn't specified this is still valid
        if (appleAppArgumentUrl?.isFalsishOrEmpty()) return null;

        try {
            // we have already asserted that the param is not undefined
            return new URL(appleAppArgumentUrl!);
        } catch (error) {
            throw new SmartAppBannerError(
                `Safari platform was enabled but an invalid app argument URL was specified. Provided app argument URL was "${appleAppArgumentUrl}"`,
            );
        }
    },
    appleButtonLabel: (appleButtonLabel, { rawOptions }) => {
        if (!rawOptions.platforms.includes('ios')) return null;
        return appleButtonLabel ?? null;
    },
};

/**
 * @internal
 */
export const getSmartAppBannerOptions = getOptionsParser<
    SmartBannerOptions,
    ParsedSmartBannerOptions
>(DEFAULT_OPTIONS, OPTION_PARSERS);
