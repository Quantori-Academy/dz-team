import { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useGate, useUnit } from "effector-react";
import { theme } from "theme";

import {
    $filter,
    $limit,
    $page,
    $ReagentsList,
    $sort,
    fetchReagentsFx,
    ReagentsGate,
    setFilter,
    setSort,
} from "../../../stores/reagents";
import { headers } from "../Table/mockData";
import { Table } from "../Table/Table";
import { Pagination } from "./Pagination";

export const ReagentsListPage = () => {
    useGate(ReagentsGate);
    const navigate = useNavigate();
    const handleActionClick = () => {
        alert(`click!`);
    };

    const reagents = useUnit($ReagentsList);
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

    const handleSortRequest = (property) => {
        const isAsc = sortedMaterials.field === property && sortedMaterials.order === "asc";
        setSort({ field: property, order: isAsc ? "desc" : "asc" });
    };

    // debounce fucntion for filter
    const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFilter(event.target.value as string);
    };

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.default,
                width: "100%",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                }}
            >
                <Button variant="contained" onClick={() => navigate({ to: "/", replace: true })}>
                    Back
                </Button>
            </Box>
            <Typography variant="h3" sx={{ color: theme.palette.text.primary, padding: "20px" }}>
                Reagents List
            </Typography>
            <Pagination data={reagents} />
            <TextField
                type="text"
                label="Filter by name"
                variant="outlined"
                value={currentFilter}
                onChange={handleFilterChange}
                fullWidth
            />
            <Table
                data={reagents}
                headers={headers}
                actionLabel="Edit"
                onActionClick={handleActionClick}
                sortedMaterials={sortedMaterials}
                handleSortRequest={handleSortRequest}
            />
        </Box>
    );
};
