import { enqueueSnackbar } from "notistack";

export function handleError(err: Error, url: unknown, options?: object): void {
    const errorDetails = `
Name: ${err.name}
Message: ${err.message}
Stack: ${err.stack || "No stack available"}
URL: ${JSON.stringify(url)}}
Options: ${JSON.stringify(options, null, 2)}
`;

    dev.error(`Full error information:\n${errorDetails}`);
    enqueueSnackbar(err.message, { variant: "error" });
}
