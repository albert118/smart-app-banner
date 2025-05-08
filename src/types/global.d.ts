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

    // auto-imports for Vitest
    const afterAll: (typeof import('vitest'))['afterAll'];
    const afterEach: (typeof import('vitest'))['afterEach'];
    const assert: (typeof import('vitest'))['assert'];
    const beforeAll: (typeof import('vitest'))['beforeAll'];
    const beforeEach: (typeof import('vitest'))['beforeEach'];
    const describe: (typeof import('vitest'))['describe'];
    const expect: (typeof import('vitest'))['expect'];
    const suite: (typeof import('vitest'))['suite'];
    const test: (typeof import('vitest'))['test'];
    const vi: (typeof import('vitest'))['vi'];
    const vitest: (typeof import('vitest'))['vitest'];
}
