import * as rt from "runtypes";

const logError = (err: unknown) => dev.info("{!offline}", err);

export function handleError(
    err: Error,
    url: unknown,
    options?: { contract?: rt.Runtype } & object,
): void {
    const errorDetails = `
Name: ${err.name}
Message: ${err.message}
Stack: ${err.stack || "No stack available"}
URL: ${JSON.stringify(url)}}
Options: ${JSON.stringify(options, null, 2)}
`;

    logError(`Full error information:\n${errorDetails}`);
}
