import { errorToast } from "utils/errorToast";

export function handleError(err: Error, url: unknown, options?: object): void {
    const errorDetails = `
Name: ${err.name}
Message: ${err.message}
Stack: ${err.stack || "No stack available"}
URL: ${JSON.stringify(url)}}
Options: ${JSON.stringify(options, null, 2)}
`;

    dev.error(`Full error information:\n${errorDetails}`);
    errorToast(err.message);
}
