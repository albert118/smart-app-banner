import { type SupportedPlatForm } from '@models';
import Logger from 'js-logger';

export function getCurrentPlatform(): SupportedPlatForm | undefined {
    const userAgent = window.navigator.userAgent;
    let currentPlatform: SupportedPlatForm | undefined = undefined;

    Logger.debug('Current user agent: ', userAgent);

    if (/Android/i.test(userAgent)) {
        currentPlatform = 'android';
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
        currentPlatform = 'ios';
    }

    if (/Safari/i.test(userAgent) && /Mobile/i.test(userAgent)) {
        currentPlatform = 'safari';
    }

    // undefined denotes an unsupported platform
    !currentPlatform && Logger.debug('The current platform is not supported');

    return currentPlatform;
}
