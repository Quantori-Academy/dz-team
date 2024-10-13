import { Box, Button, Typography, useTheme } from "@mui/material";
import { useUnit } from "effector-react";

import { page, setPage } from "../../stores/materials";

export const Pagination = () => {
    const theme = useTheme();

    const currentPage = useUnit(page);

    const handleNext = () => setPage(currentPage + 1);
    const handlePrev = () => setPage(currentPage - 1);
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "100%",
                marginBottom: "20px",
            }}
        >
            {" "}
            <Button
                style={{
                    backgroundColor: theme.palette.primary.main,
                    color:
                        currentPage === 1
                            ? theme.palette.text.disabled
                            : theme.palette.text.primary,
                    cursor: "pointer",
                }}
                onClick={handlePrev}
                disabled={currentPage === 1}
            >
                Previous
            </Button>
            <Typography style={{ color: theme.palette.text.primary }} variant="body1">
                Page: {currentPage}
            </Typography>
            <Button
                style={{
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.text.primary,
                    cursor: "pointer",
                }}
                onClick={handleNext}
            >
                Next
            </Button>
        </Box>
    );
};
