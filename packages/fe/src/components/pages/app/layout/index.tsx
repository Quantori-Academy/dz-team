import "logger/debug-load";

import { Box, Container } from "@mui/material";
import { Outlet } from "@tanstack/react-router";

import { Footer } from "components/footer";
import { Header } from "components/header";

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
            <Container>
                <Outlet />
            </Container>
            <Footer />
        </Box>
    );
}
