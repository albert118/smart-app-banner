import { type SmartAppBanner } from './smartappbanner';
import { SmartAppBannerError, type SmartBannerOptions } from '@models';

vi.mock('@utils/platformUtil', () => ({
    getCurrentPlatform: vi.fn(),
}));

vi.mock('@data/options', () => ({
    getSmartAppBannerOptions: vi.fn(options => options),
}));

import { getCurrentPlatform } from '@utils/platformUtil';

describe('SmartAppBanner', () => {
    let banner: SmartAppBanner;
    const defaultOptions: SmartBannerOptions = {
        title: 'Test App',
        author: 'Test Author',
        price: '$0.99',
        androidPrice: '$0.89',
        applePrice: '$0.99',
        icon: 'default-icon.png',
        androidIcon: 'android-icon.png',
        appleIcon: 'apple-icon.png',
        buttonLabel: 'Install',
        androidButtonLabel: 'Get it on Google Play',
        appleButtonLabel: 'Download on the App Store',
        googlePlayStoreUrl: 'https://play.google.com',
        appStoreUrl: 'https://apps.apple.com',
        verbose: false,
        dismissPath: '/',
    };

    const getBanner = () => document.querySelector(`#${banner.bannerId}`);

    beforeEach(async () => {
        document.body.innerHTML = '';
        (getCurrentPlatform as any).mockReturnValue('android');
        // dynamically import to ensure mocking order of operations is as expected
        const { SmartAppBanner } = await import('./smartappbanner');
        banner = new SmartAppBanner(defaultOptions);
    });

    afterEach(() => {
        banner.destroy();
        document.body.innerHTML = '';
    });

    describe('lifecycle', () => {
        test('should initialize with parsed options and platform', () => {
            expect(banner.options).toEqual(defaultOptions);
            //  this test environment is mocked as Android
            expect(banner.platform).toBe('android');
        });

        test('should not mount if platform is undefined', async () => {
            (getCurrentPlatform as any).mockReturnValue(undefined);
            // dynamically import to ensure mocking order of operations is as expected
            const { SmartAppBanner } = await import('./smartappbanner');
            const noPlatformBanner = new SmartAppBanner(defaultOptions);
            noPlatformBanner.mount();
            expect(document.querySelector(banner.bannerId)).toBeNull();
        });

        test('should mount banner and attach to body', () => {
            banner.mount();
            expect(getBanner()).not.toBeNull();
        });

        test('should dispatch ReadyEvent after mounting', () => {
            const readySpy = vi.fn();
            banner.addEventListener('ready', readySpy);
            banner.mount();
            expect(readySpy).toHaveBeenCalled();
        });

        test('should destroy banner and dispatch DestroyedEvent', () => {
            banner.mount();
            const destroySpy = vi.fn();
            banner.addEventListener('destroyed', destroySpy);
            banner.destroy();
            const el = getBanner();
            expect(el).toBeNull();
            expect(destroySpy).toHaveBeenCalled();
        });
    });

    describe('interaction', () => {
        test('should handle click on close button', () => {
            banner.mount();
            const removeEventListenersSpy = vi.spyOn(
                banner,
                'removeEventListeners',
            );

            const destroySpy = vi.spyOn(banner, 'destroy');
            const event = new Event('click');
            const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
            banner.onClickClose(event);
            expect(destroySpy).toHaveBeenCalled();
            expect(preventDefaultSpy).toHaveBeenCalled();

            // we should also clean up event listeners
            expect(removeEventListenersSpy).toHaveBeenCalled();
        });

        test('should handle click on call-to-action (aka. "View") button', () => {
            const ctaSpy = vi.fn();
            banner.addEventListener('clicked-call-to-action', ctaSpy);
            const event = new Event('click');
            const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
            banner.onClickCallToAction(event);
            expect(ctaSpy).toHaveBeenCalled();
            // this should not be prevented, as the a tag has config to handle the URL
            expect(preventDefaultSpy).not.toHaveBeenCalled();
        });
    });

    describe('platform specifics', () => {
        test('should return android platform-specific getters', async () => {
            (getCurrentPlatform as any).mockReturnValue('android');
            // dynamically import to ensure mocking order of operations is as expected
            const { SmartAppBanner } = await import('./smartappbanner');
            const androidBanner = new SmartAppBanner(defaultOptions);
            expect(androidBanner.title).toBe('Test App');
            expect(androidBanner.author).toBe('Test Author');
            expect(androidBanner.price).toBe('$0.89');
            expect(androidBanner.icon).toBe('android-icon.png');
            expect(androidBanner.buttonUrl).toBe('https://play.google.com');
            expect(androidBanner.buttonLabel).toBe('Get it on Google Play');
        });

        test('should return ios platform-specific getters', async () => {
            (getCurrentPlatform as any).mockReturnValue('ios');
            // dynamically import to ensure mocking order of operations is as expected
            const { SmartAppBanner } = await import('./smartappbanner');
            const iosBanner = new SmartAppBanner(defaultOptions);
            expect(iosBanner.title).toBe('Test App');
            expect(iosBanner.author).toBe('Test Author');
            expect(iosBanner.price).toBe('$0.99');
            expect(iosBanner.icon).toBe('apple-icon.png');
            expect(iosBanner.buttonUrl).toBe('https://apps.apple.com');
            expect(iosBanner.buttonLabel).toBe('Download on the App Store');
        });

        test('should not set values for Safari nor render to DOM', async () => {
            (getCurrentPlatform as any).mockReturnValue('safari');
            // dynamically import to ensure mocking order of operations is as expected
            const { SmartAppBanner } = await import('./smartappbanner');
            const safariBanner = new SmartAppBanner(defaultOptions);

            // values should be undefined
            expect(safariBanner.title).toBeUndefined();
            expect(safariBanner.author).toBeUndefined();
            expect(safariBanner.price).toBeUndefined();
            expect(safariBanner.icon).toBeUndefined();
            expect(safariBanner.buttonUrl).toBeUndefined();
            expect(safariBanner.buttonLabel).toBeUndefined();

            // DOM should not mount a banner
            expect(document.querySelector(banner.bannerId)).toBeNull();
        });

        test('should add Safari meta tag', async () => {
            (getCurrentPlatform as any).mockReturnValue('safari');
            // dynamically import to ensure mocking order of operations is as expected
            const { SmartAppBanner } = await import('./smartappbanner');

            const safariOptions = {
                appleAppId: '12354',
                appleAppArgumentUrl: 'https://not-real.fake/somepath/1111?arg=1',
            };
            const safariBanner = new SmartAppBanner({
                ...defaultOptions,
                ...safariOptions,
            });
            safariBanner.mount();

            const safariMetaTag = [
                ...document.head.querySelectorAll('meta'),
            ].find(meta => meta.name === 'apple-itunes-app');

            expect(safariMetaTag).toBeDefined();
            expect(safariMetaTag!.content).toMatch(
                `app-id=${safariOptions.appleAppId}, app-argument=${safariOptions.appleAppArgumentUrl}`,
            );
        });

        test('should throw an error when attempting to resolve HTML for Safari', async () => {
            (getCurrentPlatform as any).mockReturnValue('safari');
            // dynamically import to ensure mocking order of operations is as expected
            const { SmartAppBanner } = await import('./smartappbanner');
            const safariBanner = new SmartAppBanner(defaultOptions);

            let caughtError: any | undefined = undefined;
            try {
                safariBanner.mount();
                // should never resolve!
                const _ = safariBanner.html;
            } catch (error) {
                caughtError = error;
            }

            expect(caughtError).toStrictEqual(
                new SmartAppBannerError(
                    'Attempted to render banner. However, the current platform is Safari. This should instead be handled via their recommended meta tag.\nSee: https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners',
                ),
            );
        });
    });
});
