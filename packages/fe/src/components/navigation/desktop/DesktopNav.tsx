import { Box } from "@mui/material";

import { NavList } from "../NavList";

export function DesktopNav() {
    return (
        <Box
            display={{ xs: "none", sm: "flex" }}
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            gap={1}
            flexShrink={0}
            width={{
                sm: "220px",
                lg: "280px",
            }}
        >
            <NavList />
        </Box>
    );
}
