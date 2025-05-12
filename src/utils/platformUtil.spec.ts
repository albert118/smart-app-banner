import { getCurrentPlatform } from './platformUtil';

// most examples are taken from this site
// https://deviceatlas.com/blog/list-of-user-agent-strings
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

    test.each([
        // generic
        'Mozilla/5.0 (Linux; Android 10; Mobile)',
        // Client Hints support
        'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36,gzip(gfe)',
        'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        // Samsung
        'Mozilla/5.0 (Linux; Android 15; SM-S931B Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/127.0.6533.103 Mobile Safari/537.36',
        'Mozilla/5.0 (Linux; Android 15; SM-S931U Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/132.0.6834.163 Mobile Safari/537.36',
        // Samsung Flip
        'Mozilla/5.0 (Linux; Android 14; SM-F9560 Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/127.0.6533.103 Mobile Safari/537.36',
        // Pixel
        'Mozilla/5.0 (Linux; Android 14; Pixel 9 Pro Build/AD1A.240418.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/124.0.6367.54 Mobile Safari/537.36',
    ])(
        'should return "android" for known Android userAgents',
        (testUserAgent: string) => {
            // @ts-ignore
            window.navigator.userAgent = testUserAgent;
            expect(getCurrentPlatform()).toBe('android');
        },
    );

    test.each([
        // iPhone on Chrome
        'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/69.0.3497.105 Mobile/15E148 Safari/605.1',
        // iPhone on Firefox
        'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/13.2b11866 Mobile/16A366 Safari/605.1.15',
    ])(
        'should return "ios" when userAgent is an iOS mobile device NOT using Safari',
        (testUserAgent: string) => {
            // @ts-ignore
            window.navigator.userAgent = testUserAgent;
            expect(getCurrentPlatform()).toBe('ios');
        },
    );

    // test.each([
    //     // generic/simple UA
    //     'Mozilla/5.0 (iPad; CPU OS 13_5_1)',
    //     'Mozilla/5.0 (iPad16,3; CPU OS 18_3_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Tropicana_NJ/5.7.1',
    // ])(
    //     'should return "ios" when userAgent is an iPad',
    //     (testUserAgent: string) => {
    //         // @ts-ignore
    //         window.navigator.userAgent = testUserAgent;
    //         expect(getCurrentPlatform()).toBe('ios');
    //     },
    // );

    // test('should return "ios" for iPadOS 13+ with maxTouchPoints', () => {
    //     // @ts-ignore
    //     window.navigator.userAgent =
    //         'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5)';
    //     // @ts-ignore
    //     window.navigator.maxTouchPoints = 5;
    //     expect(getCurrentPlatform()).toBe('ios');
    // });

    test.each([
        //  iPhone XR (Safari)
        'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1',
        // iPhone 13 Pro Max
        'Mozilla/5.0 (iPhone14,3; U; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19A346 Safari/602.1',
        // iPhone 14 Pro Max
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
    ])(
        'should return "safari" when Safari iOS mobile devices',
        (testUserAgent: string) => {
            // @ts-ignore
            window.navigator.userAgent = testUserAgent;
            expect(getCurrentPlatform()).toBe('safari');
        },
    );

    test.each([
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
        'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36>',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
        'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1',
        'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
    ])(
        'should return "undefined" when userAgent is a desktop environment (regardless if it contains "Safari")',
        (testUserAgent: string) => {
            // @ts-ignore
            window.navigator.userAgent = testUserAgent;
            expect(getCurrentPlatform()).toBeUndefined();
        },
    );

    test('should not throw SmartAppBannerError when platform cannot be determined', () => {
        // @ts-ignore
        window.navigator.userAgent =
            '23324758327580923798013 garbage !! df9 &^S%D$^R!F!*TGF | |A|WR B|AWR@#54 yA';
        // @ts-ignore
        window.navigator.maxTouchPoints = 0;
        expect(() => getCurrentPlatform()).not.toThrow();
        const result = getCurrentPlatform();
        expect(result).toBeUndefined();
    });
});
