import "./logger/debug-load";

import { ThemeProvider } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import { SnackbarProvider } from "notistack";
import { theme } from "theme";

export function App() {
    return (
        <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "right" }}>
            <ThemeProvider theme={theme}>
                <Outlet />
            </ThemeProvider>
        </SnackbarProvider>
    );
}
