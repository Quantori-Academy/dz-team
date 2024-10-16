import { useEffect } from "react";
import { Box, Button, TextField, ThemeProvider, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useGate, useUnit } from "effector-react";
import { theme } from "theme";

import {
    $filter,
    $limit,
    $materialsList,
    $page,
    $sort,
    fetchMaterialsFx,
    MaterialsGate,
    setFilter,
    setSort,
} from "../../../stores/materials";
import { headers } from "../Table/mockData";
import { Table } from "../Table/Table";
import { Pagination } from "./Pagination";

export const ReagentsListPage = () => {
    useGate(MaterialsGate);
    const navigate = useNavigate();
    const handleActionClick = () => {
        alert(`click!`);
    };

    const materials = useUnit($materialsList);
    const currentFilter = useUnit($filter);
    const sortedMaterials = useUnit($sort);

    useEffect(() => {
        fetchMaterialsFx({
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
        <ThemeProvider theme={theme}>
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
                    <Button
                        sx={{
                            color: theme.palette.text.primary,
                            cursor: "pointer",
                            padding: "6px 16px",
                            borderRadius: "4px",
                        }}
                        variant="contained"
                        onClick={() => navigate({ to: "/", replace: true })}
                    >
                        Back
                    </Button>
                </Box>
                <Typography
                    variant="h3"
                    sx={{ color: theme.palette.text.primary, padding: "20px" }}
                >
                    Reagents List
                </Typography>
                <Pagination data={materials} />
                <TextField
                    type="text"
                    label="Filter by name"
                    variant="outlined"
                    value={currentFilter}
                    onChange={handleFilterChange}
                    fullWidth
                />
                <Table
                    data={materials}
                    headers={headers}
                    actionLabel="Edit"
                    onActionClick={handleActionClick}
                    sortedMaterials={sortedMaterials}
                    handleSortRequest={handleSortRequest}
                />
            </Box>
        </ThemeProvider>
    );
};
