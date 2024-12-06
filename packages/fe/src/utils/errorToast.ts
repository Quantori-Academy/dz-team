import { toast } from "react-toastify";
import { darken, lighten } from "@mui/material";
import { theme } from "theme";

export const getColor = theme.palette.mode === "light" ? darken : lighten;
export const getBackgroundColor = theme.palette.mode === "light" ? lighten : darken;

export function errorToast(message: string) {
    return toast.error(message, {
        style: {
            backgroundColor: getBackgroundColor(theme.palette.error.light, 0.9),
            color: getColor(theme.palette.error.light, 0.6),
        },
    });
}
