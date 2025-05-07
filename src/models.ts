export type SupportedPlatForm = 'android' | 'ios' | 'safari';

export type SmartBannerOptions = {
    title: string;
    author: string;

    /**
     * The main asset to show. This should is expected to be a URL that resolves an image.
     * This can be overriden on a per-platform basis as needed.
     */
    icon?: string;

    /**
     * Enabled platforms. If a platform is enabled here it must be configured.
     *
     * If 'safari' is included, then the native Safari banner will be enabled and require additional configuration.
     * Ensure that the appleAppId and (optionally) the appleAppArgumentUrl.
     *
     * @see https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners
     * @default ['android', 'ios']
     */
    platforms: SupportedPlatForm[];

    /**
     * The price tagline of the app, this can be any string you prefer.
     * This can be overriden on a per-platform basis as needed. If not provided, then the platform
     * specific options will be preferred.
     *
     * @default undefined (prefer platform specific by default)
     */
    price?: string;

    /**
     * View button label. This can be overriden on a per-platform basis as needed.
     * @default View
     */
    buttonLabel?: string;

    /**
     * Enable verbose logging. Disabled by default.
     *
     * @default false
     */
    verbose: boolean;

    // --------------------------------------------
    // Android Platform Options

    /**
     * The Google Play Store URL.
     *
     * @example https://play-store-application-url
     */
    googlePlayStoreUrl?: string;

    /**
     * Android specific button label. If not specified, falls back to buttonLabel.
     */
    androidButtonLabel?: string;

    /**
     * Android specific icon. This should is expected to be a URL that resolves an image.
     */
    androidIcon?: string;

    /**
     * Android specific price tagline.
     * @default GET - On the Google Play Store
     */
    androidPrice?: string;

    // --------------------------------------------
    // Apple Platform Options

    /**
     * The Apple app store URL.
     * @example https://app-store-application-url
     */
    appStoreUrl?: string;

    /**
     * Sets the Apple app store ID. This IS required if enableSafariSupport is true
     *
     * @see https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners
     */
    appleAppId?: string;

    /**
     * Sets the argument URL parsed to Safari browsers.
     *
     * @see https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners
     */
    appleAppArgumentUrl?: string;

    /**
     * Apple specific button label. If not specified, falls back to buttonLabel.
     */
    appleButtonLabel?: string;

    /**
     * Apple specific icon. This should is expected to be a URL that resolves an image.
     */
    appleIcon?: string;

    /**
     * Apple specific price tagline.
     * @default GET - On the App Store
     */
    applePrice?: string;
};

/**
 * Parsed Smart App Banner options
 */
export type ParsedSmartBannerOptions = {
    title: string;
    author: string;
    icon: string | null;
    platforms: SupportedPlatForm[];
    price: string | null;
    buttonLabel: string;
    verbose: boolean;

    // --------------------------------------------
    // Android Platform Options
    googlePlayStoreUrl: URL | null;
    androidButtonLabel: string | null;
    androidIcon: string | null;
    androidPrice: string;

    // --------------------------------------------
    // Apple Platform Options
    appStoreUrl: URL | null;
    appleAppId: string | null;
    appleAppArgumentUrl: URL | null;
    appleButtonLabel: string | null;
    appleIcon: string | null;
    applePrice: string;
};

export class SmartAppBannerError extends Error {
    constructor(message: string, reason?: any) {
        super(
            reason && reason instanceof Error
                ? `${message}: ${reason.message}`
                : message,
        );
        this.name = 'SmartAppBanner';
        // TODO: stack trace edit to simplify the stack trace
        (Error as any).captureStackTrace?.(this, SmartAppBannerError);
    }
}
