import { useEffect } from "react";
import { Box, TextField, ThemeProvider, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useUnit } from "effector-react";
import { theme } from "theme";

import { headers } from "components/Table/mockData";

import {
    $materialsList,
    debouncedSetFilter,
    fetchMaterialsFx,
    filter,
    limit,
    page,
    sort,
} from "../../stores/materials";
import { Table } from "../Table/Table";
import { Pagination } from "./Pagination";
import { Sorting } from "./Sorting";

export const ReagentsListPage = () => {
    const handleActionClick = () => {
        alert(`click!`);
    };

    const materials = useUnit($materialsList);
    const currentFilter = useUnit(filter);

    useEffect(() => {
        fetchMaterialsFx({
            page: page.getState(),
            limit: limit.getState(),
            sort: null,
            filter: null,
        });
    }, []);
    const handleApplySort = () => {
        fetchMaterialsFx({
            page: page.getState(),
            limit: limit.getState(),
            sort: sort.getState(),
            filter: null,
        });
    };

    // debounce fucntion for filter
    const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        debouncedSetFilter(event.target.value as string);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    backgroundColor: theme.palette.background.default,
                    width: "100%",
                    padding: "20px",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                    <Link
                        to="/"
                        style={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.text.primary,
                            cursor: "pointer",
                            padding: "6px 16px",
                            borderRadius: "4px",
                        }}
                    >
                        Back
                    </Link>
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
                    sx={{ marginBottom: "20px" }}
                />
                <Sorting handleApplySort={handleApplySort} />
                <Table
                    data={materials}
                    headers={headers}
                    actionLabel="Edit"
                    onActionClick={handleActionClick}
                />
            </Box>
        </ThemeProvider>
    );
};
