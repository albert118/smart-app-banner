import { SmartAppBannerError, type SmartBannerOptions } from '@models';
import {
    DEFAULT_OPTIONS,
    getSmartAppBannerOptions,
    OPTION_PARSERS,
} from './options';
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

    test('throws if appleAppId is falsish with safari platform', () => {
        expect(() =>
            OPTION_PARSERS.appleAppId('', {
                defaultValue: null,
                // @ts-ignore
                rawOptions: { platforms: ['safari'] },
            }),
        ).toThrow(SmartAppBannerError);
    });

    test('returns valid appleAppId', () => {
        expect(
            OPTION_PARSERS.appleAppId('12345', {
                defaultValue: null,
                // @ts-ignore
                rawOptions: { platforms: ['safari'] },
            }),
        ).toBe('12345');
    });

    test('throws if appleAppArgumentUrl is invalid', () => {
        expect(() =>
            OPTION_PARSERS.appleAppArgumentUrl('bad-url', {
                defaultValue: null,
                // @ts-ignore
                rawOptions: { platforms: ['safari'] },
            }),
        ).toThrow(SmartAppBannerError);
    });

    test('returns valid appleAppArgumentUrl', () => {
        const url = 'https://example.com';
        expect(
            OPTION_PARSERS.appleAppArgumentUrl(url, {
                defaultValue: null,
                // @ts-ignore
                rawOptions: { platforms: ['safari'] },
            }),
        ).toEqual(new URL(url));
    });
});

describe('getSmartAppBannerOptions', () => {
    // test('applies defaults when no config provided', () => {
    //     const result = getSmartAppBannerOptions({});
    //     expect(result).toMatchObject(DEFAULT_OPTIONS);
    // });

    test('warns on unknown option', () => {
        getSmartAppBannerOptions({ unknown: 'value' } as any);
        expect(vi.mocked(Logger).warn).toHaveBeenCalledWith(
            'Unknown option unknown',
        );
    });

    test('parses known options correctly', () => {
        const options: SmartBannerOptions = {
            title: 'A title!',
            author: 'It was the other guy 👀',
            icon: '/icon.png',
            platforms: ['android'],
            price: '$1.99',
            buttonLabel: 'Get test',
            verbose: true,
            googlePlayStoreUrl: 'https://play.google.com',
            androidIcon: 'android-icon.png',
            androidButtonLabel: 'Install',
            androidPrice: 'Free',
            appStoreUrl: 'https://apps.apple.com',
            appleAppId: '12345',
            appleAppArgumentUrl: 'https://example.com',
            appleIcon: 'apple-icon.png',
            appleButtonLabel: 'Download',
            applePrice: 'Free',
        };

        const result = getSmartAppBannerOptions(options);

        expect(result.title).toBe(options.title);
        expect(result.author).toBe(options.author);
        expect(result.icon).toBe('/icon.png');
        expect(result.googlePlayStoreUrl).toEqual(
            new URL('https://play.google.com'),
        );

        expect(result.appStoreUrl).toEqual(new URL('https://apps.apple.com'));
    });
});
