// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyType = any;
/**
 * 💪 14: add JSDoc for these helpers
 * */

/**
 * Returns the singular or plural form of a noun based on the count.
 *
 * @param {number} [count] - The number to base the pluralization on. If 1, returns singular, otherwise plural.
 * @param {string | null} [noun] - The noun to pluralize. If `fix` is true, trailing 's' is removed for singular.
 * @param {boolean} [fix=false] - If true, removes trailing 's' from the noun for singular cases.
 * @param {boolean} [withoutCount=false] - If true, omits the count from the return value.
 * @returns {string | undefined} - The correctly pluralized noun with the count or undefined if no count is provided.
 *
 * @example
 * plural(1, 'apple'); // "1 apple"
 * plural(5, 'apple'); // "5 apples"
 * plural(1, 'apples', true); // "1 apple"
 * plural(5, 'apples', true); // "5 apples"
 * plural(0, 'apple', false, true); // "apples"
 */

export const plural = (count?: number, noun?: string | null, fix = false, withoutCount = false) => {
    if (count) {
        const singular = fix && noun ? noun.replace(/s$/, "") : noun;
        const countLabel = withoutCount ? "" : `${count} `;
        return singular ? countLabel + (count === 1 ? singular : `${singular}s`) : String(count);
    }
    return undefined;
};

export function assert<T>(ok: T, message = "failed"): asserts ok {
    if (!ok) {
        const error = new Error(message);
        if (typeof dev !== "undefined") dev.info("{!assertion}", message);
        // eslint-disable-next-line no-console
        else console.log("ASSERTION: " + message);

        // TODO: maybe we'll use `Sentry` someday?
        // trackError(message, error)
        throw error;
    }
}
/**
 * 💪 121: add default parameter of your choice :)
 */
export const wait = (ms: number = 1337): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

type ApiFunc = (...args: AnyType) => AnyType;
export type ApiResponse<T extends ApiFunc> = Awaited<ReturnType<T>>;
