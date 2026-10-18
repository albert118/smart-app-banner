import type { ILogger } from 'js-logger';

export function createDefaultLogger(): Partial<ILogger> {
    return {
        trace: vi.fn(),
        debug: vi.fn(),
        info: vi.fn(),
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
        time: vi.fn(),
        timeEnd: vi.fn(),
        setLevel: vi.fn(),
        getLevel: vi.fn(),
        enabledFor: vi.fn(),
    };
}

// Importing this module mocks js-logger for the importing test run. vitest 5 requires vi.mock at the top level.
vi.mock('js-logger', async () => ({
    default: createDefaultLogger(),
}));
