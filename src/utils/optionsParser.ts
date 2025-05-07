import Logger from 'js-logger';

/**
 * Declaration of option parsers, used by {@link geTParser}
 * Maps the provided options to their default.
 */
export type OptionParsers<T, U extends T = T> = {
    [option in keyof T]: (
        val: T[option],
        opts: { defaultValue: U[option]; rawOptions: T },
    ) => U[option];
};

/**
 * Result of {@link geTParser}
 */
export type OptionsParser<T, U extends T> = {
    (config: T): U;
    defaults: Required<U>;
    parsers: OptionParsers<T, U>;
};

/**
 * Creates a function to parse the provided options object
 *
 * @template T type of provided options
 * @template U type of the default options
 *
 * @param defaults the default options
 * @param parsers function used to parse the provided options
 *
 * @example
 * ```ts
 * type MyOption = {
 *      value: number;
 *      label?: string;
 * };
 *
 * const getOption<MyOption>({
 *      value: 1,
 *      label: 'Title',
 * }, {
 *      value(value, { defValue }) {
 *          return value < 10 ? value : defValue;
 *      }
 * });
 *
 * const option = getOption({ value: 3 });
 * ```
 */
export function getOptionsParser<T extends Record<string, any>, U extends T = T>(
    defaults: Required<U>,
    parsers?: OptionParsers<T, U>,
) {
    const parser: OptionsParser<T, U> = function (userOptions: T): U {
        // merge the options - this is not a deep merge and only works for 'simple' structures
        const rawOptions: U = {
            ...defaults,
            ...userOptions,
        };

        const options: U = {} as U;

        // build the options map
        Object.entries(rawOptions).forEach(([key, value]: [keyof T, any]) => {
            if (!(parsers && key in parsers)) {
                Logger.warn(`Unknown option ${key as string}`);
                return;
            }

            options[key] = parsers[key](value, {
                rawOptions: rawOptions,
                defaultValue: defaults[key],
            });
        });

        Logger.debug();
        return options;
    };

    parser.defaults = defaults;
    parser.parsers = parsers || ({} as any);

    return parser;
}
