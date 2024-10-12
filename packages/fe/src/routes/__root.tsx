import { ThemeProvider } from "@emotion/react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { theme } from "theme";

export const Route = createRootRoute({
    component: () => <Root />,
});

function Root() {
    return (
        <ThemeProvider theme={theme}>
            <Outlet />
        </ThemeProvider>
    );
}
