export {};
declare global {
    export interface Window {
        /**
         * Avoid incorrectly detecting IE11
         *
         * @see https://www.neowin.net/news/ie11-fakes-user-agent-to-fool-gmail-in-windows-phone-81-gdr1-update/
         * @see https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/hh869301(v=vs.85)?redirectedfrom=MSDN
         */
        MSStream?: any;
    }
}
