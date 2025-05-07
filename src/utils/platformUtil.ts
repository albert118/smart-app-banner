import { SmartAppBannerError, type SupportedPlatForm } from '@models';

export function getCurrentPlatform(): SupportedPlatForm {
    const userAgent = window.navigator.userAgent;

    if (/Android/i.test(userAgent)) {
        return 'android';
    }

    // maxTouchPoints is the only effective method to detect iPad iOS 13+
    // FMI https://developer.apple.com/forums/thread/119186
    const maxTouchPoints = window.navigator.maxTouchPoints;

    if (
        (!window.MSStream &&
            !/X11|Linux|Windows/i.test(userAgent) &&
            maxTouchPoints &&
            maxTouchPoints > 0) ||
        /iPhone|iPad|iPod/i.test(userAgent)
    ) {
        return 'ios';
    }

    throw new SmartAppBannerError('Failed to determine the current platform');
}
