import { useEffect } from "react";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useUnit } from "effector-react";

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
    const theme = useTheme();
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
        <Box
            style={{
                backgroundColor: theme.palette.background.default,
                width: "100%",
                padding: "20px",
            }}
        >
            <Box style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                {" "}
                <Link to="/">
                    {" "}
                    <Button
                        style={{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.text.primary,
                            cursor: "pointer",
                            marginBottom: "20px",
                        }}
                    >
                        {" "}
                        Back
                    </Button>
                </Link>
            </Box>

            <Typography variant="h3" style={{ color: theme.palette.text.primary, padding: "20px" }}>
                Reagents List
            </Typography>
            <Pagination />

            <TextField
                type="text"
                label="Filter by name"
                variant="outlined"
                value={currentFilter}
                onChange={handleFilterChange}
                fullWidth
                style={{ marginBottom: "20px" }}
            />
            <Sorting handleApplySort={handleApplySort} />
            <Table
                materials={materials}
                headers={headers}
                actionLabel="Edit"
                onActionClick={handleActionClick}
            />
        </Box>
    );
};
