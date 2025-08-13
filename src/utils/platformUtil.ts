import { type ParsedPlatform } from '@models';
import Logger from 'js-logger';

// a good demo site for testing assumptions
// http://detectmobilebrowsers.com/
// a Gist "blog" on device detection
// https://gist.github.com/dalethedeveloper/1503252
export function getCurrentPlatform(
    userAgent: string,
): ParsedPlatform | undefined {
    let currentPlatform: ParsedPlatform | undefined = undefined;

    Logger.debug('Current user agent: ', userAgent);

    // maxTouchPoints is the only effective method to detect iPad iOS 13+
    const hasManyTouchPoints = !!(window.navigator.maxTouchPoints > 2);

    // ignore desktop user agents
    if (/X11|Windows|Macintosh/i.test(userAgent) && !hasManyTouchPoints) {
        return;
    }

    if (/android|windows phone/i.test(userAgent)) {
        currentPlatform = 'android';
    }

    if (
        /(?:iPhone|iPad|iPod)(?!.*(criOS|fxiOS|opiOS|chrome|android))/i.test(
            userAgent,
        )
    ) {
        // assert Safari after iOS to ensure we prefer Safari over non-Safari iOS browsers
        currentPlatform = 'safari';
    } else if (
        /(?:iPhone|iPad|iPod)/i.test(userAgent) ||
        (hasManyTouchPoints && /Macintosh/i.test(userAgent)) // latest iPad OS looks like Macintosh but has touchpoints
    ) {
        currentPlatform = 'ios';
    }

    // undefined denotes an unsupported platform
    !currentPlatform && Logger.debug('The current platform is not supported');

    Logger.debug('Resolved current platform as:', currentPlatform);

    return currentPlatform;
}
