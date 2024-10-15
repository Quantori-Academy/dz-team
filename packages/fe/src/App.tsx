import "./logger/debug-load";

import { ThemeProvider } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import { theme } from "theme";

export function App() {
    return (
        <ThemeProvider theme={theme}>
            <Outlet />
        </ThemeProvider>
    );
}
