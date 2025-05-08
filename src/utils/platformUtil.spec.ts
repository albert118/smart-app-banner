import { getCurrentPlatform } from './platformUtil';
import { SmartAppBannerError } from '@models';

describe('getCurrentPlatform', () => {
    const originalNavigator = window.navigator;

    beforeEach(() => {
        // @ts-ignore
        delete window.navigator;
        // @ts-ignore
        window.navigator = { ...originalNavigator };
    });

    afterEach(() => {
        window.navigator = originalNavigator;
    });

    test('should return "android" when userAgent contains Android', () => {
        // @ts-ignore
        window.navigator.userAgent = 'Mozilla/5.0 (Linux; Android 10; Mobile)';
        expect(getCurrentPlatform()).toBe('android');
    });

    test('should return "ios" when userAgent contains iPhone', () => {
        // @ts-ignore
        window.navigator.userAgent =
            'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1)';
        expect(getCurrentPlatform()).toBe('ios');
    });

    test('should return "ios" when userAgent contains iPad', () => {
        // @ts-ignore
        window.navigator.userAgent = 'Mozilla/5.0 (iPad; CPU OS 13_5_1)';
        expect(getCurrentPlatform()).toBe('ios');
    });

    test('should return "ios" for iPadOS 13+ with maxTouchPoints', () => {
        // @ts-ignore
        window.navigator.userAgent =
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5)';
        // @ts-ignore
        window.navigator.maxTouchPoints = 5;
        expect(getCurrentPlatform()).toBe('ios');
    });

    test('should throw SmartAppBannerError when platform cannot be determined', () => {
        // @ts-ignore
        window.navigator.userAgent = 'Mozilla/5.0 (X11; Linux x86_64)';
        // @ts-ignore
        window.navigator.maxTouchPoints = 0;
        expect(() => getCurrentPlatform()).toThrow(SmartAppBannerError);
    });

    test('should throw SmartAppBannerError on Windows without maxTouchPoints', () => {
        // @ts-ignore
        window.navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
        // @ts-ignore
        window.navigator.maxTouchPoints = 0;
        expect(() => getCurrentPlatform()).toThrow(SmartAppBannerError);
    });
});
