import { createApp, defineComponent, h } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SmartAppBannerPlugin, {
    SmartAppBanner,
    useSmartAppBanner,
    type SmartBannerOptions,
} from './index';

const ANDROID_USER_AGENT =
    'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
const DESKTOP_USER_AGENT =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

const validOptions: SmartBannerOptions = {
    title: 'PropertyMe',
    author: 'Property Me Pty Ltd',
    icon: '/icon.png',
    platforms: ['android', 'ios'],
    googlePlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.example',
    appStoreUrl: 'https://apps.apple.com/app/apple-store/id1',
};

function stubUserAgent(userAgent: string) {
    vi.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(userAgent);
}

function mountProbe(options?: SmartBannerOptions) {
    let banner: SmartAppBanner | undefined;
    let error: unknown;

    const Probe = defineComponent({
        setup() {
            try {
                banner = useSmartAppBanner();
            } catch (e) {
                error = e;
            }

            return () => h('div');
        },
    });

    const app = createApp(Probe);
    if (options) app.use(SmartAppBannerPlugin, options);
    app.mount(document.createElement('div'));

    return { app, banner, error };
}

describe('SmartAppBannerPlugin', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should provide a banner instance to components when installed with valid options', () => {
        stubUserAgent(ANDROID_USER_AGENT);

        const { banner, error } = mountProbe(validOptions);

        expect(error).toBeUndefined();
        expect(banner).toBeInstanceOf(SmartAppBanner);
    });

    it('should expose the instance as $smartAppBanner when installed with valid options', () => {
        stubUserAgent(ANDROID_USER_AGENT);

        const { app, banner } = mountProbe(validOptions);

        expect(app.config.globalProperties.$smartAppBanner).toBe(banner);
    });

    it('should detect the android platform when running on an Android user agent', () => {
        stubUserAgent(ANDROID_USER_AGENT);

        const { banner } = mountProbe(validOptions);

        expect(banner?.platform).toBe('android');
    });

    it('should have no platform when running on a desktop user agent', () => {
        stubUserAgent(DESKTOP_USER_AGENT);

        const { banner } = mountProbe(validOptions);

        expect(banner?.platform).toBeUndefined();
    });

    it('should not provide an instance when the options are invalid', () => {
        stubUserAgent(ANDROID_USER_AGENT);
        vi.spyOn(console, 'warn').mockImplementation(() => {});

        const { app, banner, error } = mountProbe({ ...validOptions, title: '' });

        expect(banner).toBeUndefined();
        expect(error).toBeInstanceOf(Error);
        expect(app.config.globalProperties.$smartAppBanner).toBeUndefined();
    });
});

describe('useSmartAppBanner', () => {
    it('should throw a descriptive error when the plugin is not installed', () => {
        const { banner, error } = mountProbe();

        expect(banner).toBeUndefined();
        expect((error as Error).message).toContain(
            'No Smart App Banner instance was provided',
        );
    });
});
