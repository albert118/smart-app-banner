import type { ILogger } from 'js-logger';

export function createDefaultLogger(): Partial<ILogger> {
    return {
        trace: vi.fn(m => console.log(m)),
        debug: vi.fn(m => console.log(m)),
        info: vi.fn(m => console.log(m)),
        log: vi.fn(m => console.log(m)),
        warn: vi.fn(m => console.log(m)),
        error: vi.fn(m => console.log(m)),
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
