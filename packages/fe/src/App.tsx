import "./logger/debug-load";

import { Box, Container } from "@mui/material";
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
