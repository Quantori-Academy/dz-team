import { Box } from "@mui/material";

import { NavList } from "../NavList";

export function DesktopNav() {
    return (
        <Box
            sx={{
                height: "100%",
                width: "fit-content",
                maxWidth: "270px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                gap: "8px",
            }}
        >
            <NavList />
        </Box>
    );
}
