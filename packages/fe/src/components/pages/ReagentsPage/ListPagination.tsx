import { Box, Button, Pagination, Stack } from "@mui/material";
import { useUnit } from "effector-react";

import { SupportedValue } from "utils/formatters";

import { $page, setPage } from "../../../stores/reagents";

type PaginationProps = {
    data: Array<Record<string, SupportedValue>>;
};

export const ListPagination = ({ data }: PaginationProps) => {
    const totalItems = data.length;
    const itemsPerPage = 5;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPage = useUnit($page);

    dev.log(totalPages);

    const handleNext = () => setPage(currentPage + 1);
    const handlePrev = () => setPage(currentPage - 1);

    const handlePageChange = (_event: React.ChangeEvent<number>, page: number) => {
        setPage(page);
    };
    //TODO add pagination button adding logic
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
            }}
        >
            <Stack spacing={2} direction="row" alignItems="center">
                <Button variant="contained" onClick={handlePrev} disabled={currentPage === 1}>
                    Previous
                </Button>
                <Pagination
                    count={8}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                />
                <Button variant="contained" onClick={handleNext} disabled={currentPage === 8}>
                    Next
                </Button>
            </Stack>
        </Box>
    );
};
