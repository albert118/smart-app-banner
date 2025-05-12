import { type SupportedPlatForm } from '@models';
import Logger from 'js-logger';

// a good demo site for testing assumptions
// http://detectmobilebrowsers.com/
// a Gist "blog" on device detection
// https://gist.github.com/dalethedeveloper/1503252
export function getCurrentPlatform(): SupportedPlatForm | undefined {
    const userAgent = window.navigator.userAgent;
    let currentPlatform: SupportedPlatForm | undefined = undefined;

    Logger.debug('Current user agent: ', userAgent);

    // ignore desktop user agents
    if (/X11|Windows|Macintosh/i.test(userAgent)) {
        return;
    }

    if (/android|windows phone/i.test(userAgent)) {
        currentPlatform = 'android';
    }

    // maxTouchPoints is the only effective method to detect iPad iOS 13+
    // FMI https://developer.apple.com/forums/thread/119186
    const maxTouchPoints = window.navigator.maxTouchPoints;
    const isTouchEnabledDevice =
        !window.MSStream && maxTouchPoints && maxTouchPoints > 0;

    const isNotSafariAppleDevice =
        /(?:iPhone|iPad|iPod)(?=.*(criOS|fxiOS|opiOS|chrome|android))/i.test(
            userAgent,
        );

    if (
        (isTouchEnabledDevice && isNotSafariAppleDevice) ||
        isNotSafariAppleDevice
    ) {
        currentPlatform = 'ios';
    } else if (
        /(?:iPhone|iPad|iPod)(?!.*(criOS|fxiOS|opiOS|chrome|android))/i.test(
            userAgent,
        )
    ) {
        // assert Safari after iOS to ensure we prefer Safari over non-Safari iOS browsers
        currentPlatform = 'safari';
    }

    // undefined denotes an unsupported platform
    !currentPlatform && Logger.debug('The current platform is not supported');

    Logger.debug('Resolved current platform as:', currentPlatform);

    return currentPlatform;
}
