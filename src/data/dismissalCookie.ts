export function useDismissalCookie() {
    const cookieName = 'smart-app-banner-dismissed';

    function getCookie(name: string) {
        const cookies: Record<string, string> = {};

        document.cookie.split(';').forEach(kvp => {
            const [name, value] = kvp.split('=');
            cookies[name.trim()] = value ?? '';
        });

        return cookies[name];
    }

    /**
     * Update or insert the dismissal cookie
     *
     * @param dismissed 1 for true, 0 for false
     * @param path a URL path that restricts the cookie to the requested URL
     * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies#define_where_cookies_are_sent
     */
    function upsertDismissalCookie(dismissed: boolean, path: string) {
        document.cookie = `${cookieName}=${dismissed ? 1 : 0}; path=${path?.isFalsishOrEmpty() ? '/' : path}`;
    }

    return {
        isDismissed: () => getCookie(cookieName) === '1',
        /**
         * Dismiss the banner
         * @param path the path to apply the dismisall to (SPAs should set '/')
         */
        dismiss: (path: string) => upsertDismissalCookie(true, path),
        /**
         * Reshow the banner
         * @param path the path to apply the dismisall to (SPAs should set '/')
         */
        show: (path: string) => upsertDismissalCookie(false, path),
    };
}
