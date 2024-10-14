import { Box, Container, Typography, useTheme } from "@mui/material";

export function Footer() {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                textAlign: "left",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.default,
                mt: "auto",
                pt: 1,
                pb: 1,
            }}
        >
            <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Typography variant="body2" sx={{ fontSize: { xs: "10px", lg: "14px" } }}>
                    &copy; 2024 Quantori Academy
                </Typography>
            </Container>
        </Box>
    );
}
