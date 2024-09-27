// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyType = any;

/**
 * Returns the singular or plural form of a noun based on the count.
 *
 * @param {number} [count] - The number used to determine singular or plural.
 * @param {string | null} [noun] - The noun to pluralize.
 * @param {boolean} [fix=false] - If true, removes trailing 's' from the noun for singular cases.
 * @param {boolean} [withoutCount=false] - If true, omits the count in the returned string.
 * @returns {string | undefined} - The pluralized noun with the count or undefined if no count is provided.
 *
 * @example
 * plural(1, 'apple'); // "1 apple"
 * plural(5, 'apple'); // "5 apples"
 * plural(1, 'apples', true); // "1 apple"
 * plural(5, 'apples', true); // "5 apples"
 * plural(0, 'apple', false, true); // undefined
 */

export const plural = (count?: number, noun?: string | null, fix = false, withoutCount = false) => {
    if (count) {
        const singular = fix && noun ? noun.replace(/s$/, "") : noun;
        const countLabel = withoutCount ? "" : `${count} `;
        return singular ? countLabel + (count === 1 ? singular : `${singular}s`) : String(count);
    }
    return undefined;
};

/**
 * Asserts that a condition is true, throwing an error if it is not.
 *
 * @param {T} ok - The condition to assert.
 * @param {string} [message="failed"] - Optional error message.
 * @throws {Error} If the assertion fails.
 */

export function assert<T>(ok: T, message: string = "failed"): asserts ok {
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
/**
 * Delays execution for a specified amount of milliseconds.
 *
 * @param {number} [ms=1337] - The number of milliseconds to wait.
 * @returns {Promise<void>} Resolves after the delay.
 */

export const wait = (ms: number = 1337): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

type ApiFunc = (...args: AnyType) => AnyType;
export type ApiResponse<T extends ApiFunc> = Awaited<ReturnType<T>>;
