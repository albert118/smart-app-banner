export type SupportedPlatForms = 'android' | 'ios' | 'safari';

export type SmartBannerOptions = {
    title: string;
    author: string;

    // TODO separate icons, button texts, etc.
    icon: string;

    /**
     * Enabled platforms. If a platform is enabled here it must be configured.
     *
     * If 'safari' is included, then the native Safari banner will be enabled and require additional configuration.
     * Ensure that the appleAppId and (optionally) the appleAppArgumentUrl.
     *
     * @see https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners
     * @default ['android', 'ios']
     */
    platforms: SupportedPlatForms[];

    /**
     * The price of the app.
     */
    price: 'free' | number;

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
    playStoreUrl?: string;

    /**
     * Android specific button label. If not specified, falls back to buttonLabel.
     */
    androidButtonLabel?: string;

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
};

/**
 * Parsed Smart App Banner options
 */
export type ParsedSmartBannerOptions = Omit<
    SmartBannerOptions,
    | 'playStoreUrl'
    | 'appStoreUrl'
    | 'appleAppArgumentUrl'
    | 'androidButtonLabel'
    | 'appleAppId'
    | 'appleButtonLabel'
> & {
    // --------------------------------------------
    // Android Platform Options
    playStoreUrl: URL | null;
    androidButtonLabel: string | null;

    // --------------------------------------------
    // Apple Platform Options
    appStoreUrl: URL | null;
    appleAppId: string | null;
    appleAppArgumentUrl: URL | null;
    appleButtonLabel: string | null;
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
