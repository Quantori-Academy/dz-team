// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyType = any;
/**
 * 💪 14: add JSDoc for these helpers
 * */
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
