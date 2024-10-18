import { Box, Typography } from "@mui/material";

export function Navigation() {
    return (
        <Box
            sx={{
                width: "fit-content",
                bgcolor: "red",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
            }}
        >
            <Typography variant="subtitle1" sx={{ textWrap: "nowrap" }}>
                test route 1
            </Typography>
            <Typography variant="subtitle1" sx={{ textWrap: "nowrap" }}>
                test route 2
            </Typography>
            <Typography variant="subtitle1" sx={{ textWrap: "nowrap" }}>
                test route 3
            </Typography>
        </Box>
    );
}
