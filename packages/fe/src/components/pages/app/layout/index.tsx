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
                paddingTop: { xs: "62px", sm: "92px" },
            }}
        >
            <Header />
            <Container
                sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "start",
                    gap: "8px",
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
