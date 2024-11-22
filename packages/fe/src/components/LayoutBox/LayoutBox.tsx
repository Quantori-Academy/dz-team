import { ReactNode } from "react";
import { Box } from "@mui/material";

const LayoutBox = ({ children }: { children: ReactNode }) => {
    return (
        <Box
            sx={{
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
            }}
        >
            {children}
        </Box>
    );
};

export default LayoutBox;
