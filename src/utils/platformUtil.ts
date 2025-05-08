import { type SupportedPlatForm } from '@models';

export function getCurrentPlatform(): SupportedPlatForm | undefined {
    const userAgent = window.navigator.userAgent;

    if (/Safari/i.test(userAgent) && /Mobile/i.test(userAgent)) {
        return 'safari';
    }

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

    return undefined; // an unsupported platform
}
