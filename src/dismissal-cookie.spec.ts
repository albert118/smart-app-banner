import { type SmartAppBanner } from './smartappbanner';
import { type SmartBannerOptions } from '@models';

vi.mock('@utils/platformUtil', () => ({
    getCurrentPlatform: vi.fn(),
}));

vi.mock('@data/options', () => ({
    getSmartAppBannerOptions: vi.fn(options => options),
}));

import { getCurrentPlatform } from '@utils/platformUtil';

describe('remember dismissal', () => {
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
        // reset all cookies fresh for every test
        document.cookie = '';

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

    test('should stay dismissed one closed', () => {
        banner.mount();
        // no cookie should be set yet, as we freshly mounted
        expect(document.cookie).toBe('');

        // close the banner, the cookie should now be set
        const event = new Event('click');
        banner.onClickClose(event);
        expect(document.cookie).toContain('smart-app-banner-dismissed=1');

        // banner should have been removed now
        expect(getBanner()?.innerHTML).toBeUndefined();
        // attempt to remount (ie. "refresh")
        banner.mount();
        // banner should still not exist
        expect(getBanner()?.innerHTML).toBeUndefined();
    });

    test('should not mount given existing cookie', () => {
        document.cookie = 'smart-app-banner-dismissed=1';
        banner.mount();
        expect(getBanner()?.innerHTML).toBeUndefined();
    });
});
