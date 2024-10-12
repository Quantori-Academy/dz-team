import "./logger/debug-load";

import { Box } from "@mui/material";
import { Outlet } from "@tanstack/react-router";

import { Footer } from "components/Footer/Footer";
import { Header } from "components/Header/Header";

export function App() {
    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <Header />
            <Outlet />
            <Footer />
        </Box>
    );
}
