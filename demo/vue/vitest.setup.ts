import '@utils/stringUtils'; // ensure extensions are implemented in tests

/**
 * TL;DR WERROR for tests (block tests that throw warnings)
 */
function throwOnWarnings() {
    console.warn = (message: string) => {
        throw new Error(`A warning occurred during test execution:\n${message}`);
    };
}

beforeEach(() => {
    vi.clearAllMocks();
    throwOnWarnings();
});
