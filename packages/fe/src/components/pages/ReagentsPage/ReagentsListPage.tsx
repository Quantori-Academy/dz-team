import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useGate, useUnit } from "effector-react";
import { theme } from "theme";

import {
    $limit,
    $page,
    $ReagentsList,
    $sort,
    fetchReagentsFx,
    ReagentsGate,
    setSort,
} from "stores/reagents";

import { Table } from "../Table/Table";

const header = [
    { key: "name", label: "Name" },
    { key: "structure", label: "Structure" },
    { key: "description", label: "Description" },
    { key: "quantity", label: "Quantity" },
    { key: "unit", label: "Unit" },
    { key: "size", label: "Size" },
    { key: "expirationDate", label: "Expiration Date" },
    { key: "storageLocation", label: "Storage Location" },
    { key: "cas", label: "CAS" },
    { key: "producer", label: "Producer" },
    { key: "catalogId", label: "Catalog ID" },
    { key: "catalogLink", label: "Catalog Link" },
    { key: "pricePerUnit", label: "Price Per Unit" },
];

export const ReagentsListPage = () => {
    useGate(ReagentsGate);
    const navigate = useNavigate();
    const handleActionClick = () => {
        alert(`click!`);
    };

    const reagents = useUnit($ReagentsList);
    // const currentFilter = useUnit($filter);
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
    // const handleFilterChange = (event: React.ChangeEvent<{ value: string }>) => {
    //     setFilter(event.target.value);
    // };

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

            <Table
                data={reagents}
                headers={header}
                actionLabel="Edit"
                onActionClick={handleActionClick}
                sortOrder={sortedMaterials}
                handleSortRequest={handleSortRequest}
            />
        </Box>
    );
};
