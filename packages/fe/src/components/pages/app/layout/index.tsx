import "logger/debug-load";

import { Box, Container } from "@mui/material";
import { Outlet } from "@tanstack/react-router";

import { Footer } from "components/footer";
import { Header } from "components/header";
import { Navigation } from "components/navigation/Navigation";

export function Layout() {
    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingTop: { xs: "62px", lg: "80px" },
            }}
        >
            <Header />
            <Container
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "start",
                }}
            >
                <Navigation />
                <Box sx={{ width: "100%" }}>
                    <Outlet />
                </Box>
            </Container>
            <Footer />
        </Box>
    );
}
