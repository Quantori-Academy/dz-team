import "react-toastify/dist/ReactToastify.css";
import "./logger/debug-load";

import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import { theme } from "theme";

export function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Outlet />
                <ToastContainer
                    autoClose={10000}
                    limit={10}
                    position="top-right"
                    closeOnClick
                    toastStyle={{ backgroundColor: "#FFEFEF", color: "#662727" }}
                />
            </ThemeProvider>
        </>
    );
}
