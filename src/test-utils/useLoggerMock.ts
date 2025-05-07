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

export function useLoggerMock() {
    function setMock() {
        vi.mock('js-logger', async () => ({
            default: createDefaultLogger(),
        }));
    }

    return {
        setMock,
    };
}
