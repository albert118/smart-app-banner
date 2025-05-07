import {
    SmartAppBannerError,
    type ParsedSmartBannerOptions,
    type SmartBannerOptions,
} from '@models';
import { getOptionsParser, type OptionParsers } from '@utils/optionsParser';
import Logger from 'js-logger';

/**
 * Default options
 * Options which are required are omitted for brevity.
 */
export const DEFAULT_OPTIONS: Required<
    Omit<ParsedSmartBannerOptions, 'title' | 'author'>
> = {
    icon: null,
    platforms: ['android', 'ios'],
    price: null,
    buttonLabel: 'View',
    verbose: false,

    // --------------------------------------------
    // Android Platform Options
    googlePlayStoreUrl: null,
    androidButtonLabel: null,
    androidIcon: null,
    androidPrice: 'FREE - On the Google Play Store',

    // --------------------------------------------
    // Apple Platform Options
    appStoreUrl: null,
    appleAppId: null,
    appleAppArgumentUrl: null,
    appleButtonLabel: null,
    appleIcon: null,
    applePrice: 'GET - On the App Store',
};

export const OPTION_PARSERS: OptionParsers<
    SmartBannerOptions,
    // @ts-ignore
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
        if (icon?.isFalsishOrEmpty()) return null;
        // this URL will be passed to the CSS URL function and might be a partial URL rather
        // than a fully qualified URI (eg. a SPA asset), return it a simple string here.
        // we have already asserted that the param is not undefined
        return icon! as string;
    },
    platforms: (platforms, { defaultValue }) => {
        if (!platforms || platforms.length === 0) return defaultValue;
        return platforms;
    },
    price: price => {
        if (price?.isFalsishOrEmpty()) return null;
        // we have already asserted that the param is not undefined
        return price!;
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
    googlePlayStoreUrl: (googlePlayStoreUrl, { rawOptions }) => {
        if (!rawOptions.platforms.includes('android')) return null;

        const reason = `The Android platform was enabled but no valid Google Play Store URL has been configured. Provided URL was "${googlePlayStoreUrl}"`;
        if (googlePlayStoreUrl?.isFalsishOrEmpty()) {
            throw new SmartAppBannerError(reason);
        }

        try {
            // we have already asserted that the param is not undefined
            const x = new URL(googlePlayStoreUrl!);
            return x;
        } catch (error) {
            throw new SmartAppBannerError(reason);
        }
    },
    androidButtonLabel: (androidButtonLabel, { rawOptions }) => {
        if (!rawOptions.platforms.includes('android')) return null;
        return androidButtonLabel ?? null;
    },
    androidIcon: (androidIcon, { rawOptions }) => {
        if (!rawOptions.platforms.includes('android')) return null;
        if (
            rawOptions.platforms.includes('android') &&
            rawOptions.icon?.isFalsishOrEmpty() &&
            androidIcon?.isFalsishOrEmpty()
        ) {
            throw new SmartAppBannerError(
                'The Android platform was enabled but there is no icon defined at all',
            );
        }
        return androidIcon ?? null;
    },
    // --------------------------------------------
    // Apple Platform Options
    appStoreUrl: (appStoreUrl, { rawOptions }) => {
        if (!rawOptions.platforms.includes('ios')) return null;

        const reason = `The iOS platform was enabled but no valid Apple App Store URL has been configured. Provided URL was "${appStoreUrl}"`;
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
                `The Safari platform was enabled but no valid Apple app ID has been configured. Provided app ID was "${appleAppId}"`,
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
                `The Safari platform was enabled but an invalid app argument URL was specified. Provided app argument URL was "${appleAppArgumentUrl}"`,
            );
        }
    },
    appleButtonLabel: (appleButtonLabel, { rawOptions }) => {
        if (!rawOptions.platforms.includes('ios')) return null;
        return appleButtonLabel ?? null;
    },
    appleIcon: (appleIcon, { rawOptions }) => {
        if (!rawOptions.platforms.includes('ios')) return null;
        if (
            rawOptions.platforms.includes('ios') &&
            rawOptions.icon?.isFalsishOrEmpty() &&
            appleIcon?.isFalsishOrEmpty()
        ) {
            throw new SmartAppBannerError(
                'The iOS platform was enabled but there is no icon defined at all',
            );
        }
        return appleIcon ?? null;
    },
};

/**
 * @internal
 */
export const getSmartAppBannerOptions = getOptionsParser<
    SmartBannerOptions,
    // @ts-ignore
    ParsedSmartBannerOptions
>(DEFAULT_OPTIONS, OPTION_PARSERS);
