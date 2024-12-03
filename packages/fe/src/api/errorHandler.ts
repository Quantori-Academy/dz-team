import { toast } from "react-toastify";
import { darken, lighten } from "@mui/material";
import { theme } from "theme";

export function handleError(err: Error, url: unknown, options?: object): void {
    const getColor = theme.palette.mode === "light" ? darken : lighten;
    const getBackgroundColor = theme.palette.mode === "light" ? lighten : darken;

    const errorDetails = `
Name: ${err.name}
Message: ${err.message}
Stack: ${err.stack || "No stack available"}
URL: ${JSON.stringify(url)}}
Options: ${JSON.stringify(options, null, 2)}
`;

    dev.error(`Full error information:\n${errorDetails}`);
    toast.error(err.message, {
        style: {
            backgroundColor: getBackgroundColor(theme.palette.error.light, 0.9),
            color: getColor(theme.palette.error.light, 0.6),
        },
    });
}
