import { SmartAppBannerError, type SmartBannerOptions } from '@models';
import { getSmartAppBannerOptions, OPTION_PARSERS } from './options';
import Logger from 'js-logger';

describe('options', () => {
    test('throws error when title is falsish', () => {
        expect(() =>
            OPTION_PARSERS.title('', {
                defaultValue: '',
                rawOptions: {} as any,
            }),
        ).toThrow(SmartAppBannerError);
    });

    test('returns title when valid', () => {
        expect(
            OPTION_PARSERS.title('truthy', {
                defaultValue: '',
                rawOptions: {} as any,
            }),
        ).toBe('truthy');
    });

    test('returns null for falsish icon', () => {
        expect(
            OPTION_PARSERS.icon('', {
                defaultValue: null,
                rawOptions: {} as any,
            }),
        ).toBeNull();
    });

    test('returns icon string when valid', () => {
        expect(
            OPTION_PARSERS.icon('icon.png', {
                defaultValue: null,
                rawOptions: {} as any,
            }),
        ).toBe('icon.png');
    });

    test('returns default platforms when none provided', () => {
        expect(
            OPTION_PARSERS.platforms(undefined, {
                defaultValue: ['android'],
                rawOptions: {} as any,
            }),
        ).toEqual(['android']);
    });

    test('returns provided platforms when given', () => {
        expect(
            OPTION_PARSERS.platforms(['ios'], {
                defaultValue: ['android'],
                rawOptions: {} as any,
            }),
        ).toEqual(['ios']);
    });

    test('returns null price when falsish', () => {
        expect(
            OPTION_PARSERS.price('', {
                defaultValue: null,
                rawOptions: {} as any,
            }),
        ).toBeNull();
    });

    test('returns price when valid', () => {
        expect(
            OPTION_PARSERS.price('$1.99', {
                defaultValue: null,
                rawOptions: {} as any,
            }),
        ).toBe('$1.99');
    });

    test('returns default buttonLabel when falsish', () => {
        expect(
            OPTION_PARSERS.buttonLabel('', {
                defaultValue: 'View',
                rawOptions: {} as any,
            }),
        ).toBe('View');
    });

    test('returns buttonLabel when valid', () => {
        expect(
            OPTION_PARSERS.buttonLabel('Download', {
                defaultValue: 'View',
                rawOptions: {} as any,
            }),
        ).toBe('Download');
    });

    test('returns default verbose when falsish', () => {
        expect(
            OPTION_PARSERS.verbose(false, {
                defaultValue: false,
                rawOptions: {} as any,
            }),
        ).toBe(false);
    });

    test('returns verbose when true and logs debug', () => {
        OPTION_PARSERS.verbose(true, {
            defaultValue: false,
            rawOptions: {} as any,
        });

        expect(vi.mocked(Logger).debug).toHaveBeenCalledWith(
            'verbose logging enabled',
        );
    });

    test('throws if android url is falsish with android platform', () => {
        expect(() =>
            OPTION_PARSERS.googlePlayStoreUrl('', {
                defaultValue: null,
                // @ts-ignore
                rawOptions: { platforms: ['android'] },
            }),
        ).toThrow(SmartAppBannerError);
    });

    test('returns valid android url', () => {
        const url = 'https://play.google.com';
        expect(
            OPTION_PARSERS.googlePlayStoreUrl(url, {
                defaultValue: null,
                // @ts-ignore
                rawOptions: { platforms: ['android'] },
            }),
        ).toEqual(new URL(url));
    });

    test('throws if android icon missing when android enabled', () => {
        expect(() =>
            OPTION_PARSERS.androidIcon('', {
                defaultValue: null,
                // @ts-ignore
                rawOptions: { platforms: ['android'], icon: '' },
            }),
        ).toThrow(SmartAppBannerError);
    });

    test('throws if ios icon missing when ios enabled', () => {
        expect(() =>
            OPTION_PARSERS.appleIcon('', {
                defaultValue: null,
                // @ts-ignore
                rawOptions: { platforms: ['ios'], icon: '' },
            }),
        ).toThrow(SmartAppBannerError);
    });

    test('throws if appStoreUrl is falsish with ios platform', () => {
        expect(() =>
            OPTION_PARSERS.appStoreUrl('', {
                defaultValue: null,
                // @ts-ignore
                rawOptions: { platforms: ['ios'] },
            }),
        ).toThrow(SmartAppBannerError);
    });

    test('returns valid appStoreUrl', () => {
        const url = 'https://apps.apple.com';
        expect(
            OPTION_PARSERS.appStoreUrl(url, {
                defaultValue: null,
                // @ts-ignore
                rawOptions: { platforms: ['ios'] },
            }),
        ).toEqual(new URL(url));
    });
});

describe('getSmartAppBannerOptions', () => {
    test('warns on unknown option', () => {
        const action = () =>
            getSmartAppBannerOptions({ unknown: 'value' } as any);

        // an error will occur because we have no valid config
        expect(action).toThrow();
        // but the logger should still be called
        expect(vi.mocked(Logger).warn).toHaveBeenCalledWith(
            'Unknown option unknown',
        );
    });

    test('parses known options correctly for Android', () => {
        const options: SmartBannerOptions = {
            title: 'A title!',
            author: 'It was the other guy 👀',
            icon: '/icon.png',
            platforms: ['android'], // <--
            price: '$1.99',
            buttonLabel: 'Get test',
            googlePlayStoreUrl: 'https://play.google.com',
            androidIcon: 'android-icon.png',
            androidButtonLabel: 'Install',
            androidPrice: 'Free',
        };

        const result = getSmartAppBannerOptions(options);

        // common options should be set
        expect(result.title).toBe(options.title);
        expect(result.author).toBe(options.author);
        expect(result.icon).toBe('/icon.png');

        // Android options should be default
        expect(result.googlePlayStoreUrl).toEqual(
            new URL('https://play.google.com'),
        );
        expect(result.androidButtonLabel).toBe('Install');
        expect(result.androidIcon).toBe('android-icon.png');
        expect(result.androidPrice).toBe('Free');

        // Apple options should default
        expect(result.appStoreUrl).toBeNull();
        expect(result.appleIcon).toBeNull();
        expect(result.appleButtonLabel).toBeNull();
        expect(result.applePrice).toBe('GET - On the App Store');
    });

    test('parses known options correctly for Apple', () => {
        const options: SmartBannerOptions = {
            title: 'A title!',
            author: 'It was the other guy 👀',
            icon: '/icon.png',
            platforms: ['ios'],
            price: '$1.99',
            buttonLabel: 'Get test',
            appStoreUrl: 'https://apps.apple.com',
            appleIcon: 'apple-icon.png',
            appleButtonLabel: 'Download',
            applePrice: 'Free',
        };

        const result = getSmartAppBannerOptions(options);

        // common options should be set
        expect(result.title).toBe(options.title);
        expect(result.author).toBe(options.author);
        expect(result.icon).toBe('/icon.png');

        // Android options should be set
        expect(result.googlePlayStoreUrl).toBeNull();
        expect(result.androidButtonLabel).toBeNull();
        expect(result.androidIcon).toBeNull();
        expect(result.androidPrice).toBe('FREE - On the Google Play Store');

        // Apple options should disabled
        expect(result.appStoreUrl).toEqual(new URL('https://apps.apple.com'));
        expect(result.appleIcon).toBe('apple-icon.png');
        expect(result.appleButtonLabel).toBe('Download');
        expect(result.applePrice).toBe('Free');
    });

    test('parses known options correctly for Safari', () => {
        const options: SmartBannerOptions = {
            title: 'Safari Time!',
            author: 'The special Safari config 🧭',
            icon: '/icon.png',
            platforms: ['safari'],
            price: '$99.99',
            buttonLabel: 'Get tested',
        };

        const result = getSmartAppBannerOptions(options);

        // common options should be set
        expect(result.title).toBe(options.title);
        expect(result.author).toBe(options.author);
        expect(result.icon).toBe('/icon.png');

        // Android options should be default
        expect(result.googlePlayStoreUrl).toBeNull();
        expect(result.androidButtonLabel).toBeNull();
        expect(result.androidIcon).toBeNull();
        expect(result.androidPrice).toBe('FREE - On the Google Play Store');

        // Apple options should default
        expect(result.appStoreUrl).toBeNull();
        expect(result.appleIcon).toBeNull();
        expect(result.appleButtonLabel).toBeNull();
        expect(result.applePrice).toBe('GET - On the App Store');
    });
});
