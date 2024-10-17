import { Box, Button, Typography, useTheme } from "@mui/material";
import { useUnit } from "effector-react";

import { Material } from "stores/example";

import { $page, setPage } from "../../../stores/reagents";

type PaginationProps = {
    data: Material[];
};

export const Pagination = ({ data }: PaginationProps) => {
    const theme = useTheme();

    const totalItems = data.length;
    const itemsPerPage = 5;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPage = useUnit($page);

    const handleNext = () => setPage(currentPage + 1);
    const handlePrev = () => setPage(currentPage - 1);
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
            }}
        >
            <Button variant="contained" onClick={handlePrev} disabled={currentPage === 1}>
                Previous
            </Button>
            <Typography style={{ color: theme.palette.text.primary }} variant="body1">
                Page: {currentPage}
            </Typography>
            <Button variant="contained" onClick={handleNext} disabled={currentPage === totalPages}>
                Next
            </Button>
        </Box>
    );
};
