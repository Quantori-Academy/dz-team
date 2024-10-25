import { Box, Container } from "@mui/material";

import { Footer } from "components/footer";
import { Header } from "components/header";

export function AdminPage() {
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
                <></>
            </Container>
            <Footer />
        </Box>
    );
}
