export type SupportedPlatForms = 'android' | 'ios' | 'safari';

export type SmartBannerOptions = {
    title: string;
    author: string;

    // TODO separate icons, button texts, etc.
    icon: string;
    platforms: SupportedPlatForms;
    price: 'free' | number;

    /**
     * --------------------------------------------
     * Android Platform Options
     */

    /**
     * The Google Play Store URL.
     *
     * @example https://play-store-application-url
     */
    playStoreUrl?: URL;

    /**
     * --------------------------------------------
     * Apple Platform Options
     */

    /**
     * The Apple app store URL.
     * @example https://app-store-application-url
     */
    appStoreUrl?: URL;

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
    appleAppArgumentUrl?: URL;

    /**
     * Toggles the native Safari banner.
     * If this is enabled then appleAppId should also be set and (optionally) the appleAppArgumentUrl.
     *
     * @see https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners
     * @default false
     */
    enableSafariSupport?: boolean;
};

/**
 * Parsed Smart App Banner options
 */
export type ParsedSmartBannerOptions = Omit<SmartBannerOptions, 'platforms'> & {
    something: string;
};
