import { Box, Container, Typography, useTheme } from "@mui/material";

export function Footer() {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                textAlign: "left",
                padding: "8px 0",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.default,
                position: "relative",
                bottom: 0,
                width: "100%",
                mt: "auto",
            }}
        >
            <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Typography variant="body2">&copy; 2024 Quantori Academy</Typography>
            </Container>
        </Box>
    );
}
