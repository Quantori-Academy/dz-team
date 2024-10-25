import "logger/debug-load";

import { Box, Container } from "@mui/material";
import { Outlet } from "@tanstack/react-router";

import { Footer } from "components/footer";
import { Header } from "components/header";
import { Navigation } from "components/navigation";

export function Layout() {
    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingTop: { xs: "62px", sm: "92px" },
            }}
        >
            <Header />
            <Container
                sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "start",
                    gap: "8px",
                    overflow: "hidden",
                }}
            >
                <Navigation />
                <Box flexGrow={1} overflow="auto">
                    <Outlet />
                </Box>
            </Container>
            <Footer />
        </Box>
    );
}
