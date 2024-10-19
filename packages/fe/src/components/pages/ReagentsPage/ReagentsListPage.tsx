import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useGate, useUnit } from "effector-react";
import { theme } from "theme";

import {
    $filter,
    $limit,
    $page,
    $sort,
    fetchReagentsFx,
    ReagentsGate,
    setFilter,
    setSort,
} from "../../../stores/reagents";
import { headers, mockData } from "../Table/mockData";
import { Table } from "../Table/Table";
import { Filter } from "./Filter";
import { ListPagination } from "./ListPagination";

export const ReagentsListPage = () => {
    useGate(ReagentsGate);
    const navigate = useNavigate();
    const handleActionClick = () => {
        alert(`click!`);
    };

    // const reagents = useUnit($ReagentsList);
    const currentFilter = useUnit($filter);
    const sortedMaterials = useUnit($sort);

    useEffect(() => {
        fetchReagentsFx({
            page: $page.getState(),
            limit: $limit.getState(),
            sort: null,
            filter: null,
        });
    }, []);

    const handleSortRequest = (property: string) => {
        const isAsc = sortedMaterials.field === property && sortedMaterials.order === "asc";
        setSort({ field: property, order: isAsc ? "desc" : "asc" });
    };

    // debounce fucntion for filter
    const handleFilterChange = (event: React.ChangeEvent<{ value: string }>) => {
        setFilter(event.target.value);
    };

    return (
        <Box
            sx={{
                width: "100%",
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                }}
            >
                <Button variant="contained" onClick={() => navigate({ to: "/", replace: true })}>
                    Back
                </Button>
            </Box>
            <Box
                sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px" }}
            >
                <Typography variant="h3" sx={{ color: theme.palette.text.primary }}>
                    Reagents List
                </Typography>
            </Box>
            <Filter currentFilter={currentFilter} filterBy={handleFilterChange} />
            <Table
                data={mockData}
                headers={headers}
                actionLabel="Edit"
                onActionClick={handleActionClick}
                sortOrder={sortedMaterials}
                handleSortRequest={handleSortRequest}
            />
            <ListPagination data={mockData} />
        </Box>
    );
};
