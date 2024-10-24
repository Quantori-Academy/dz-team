import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useGate, useUnit } from "effector-react";
import { theme } from "theme";

import { $ReagentsList, fetchReagentsFx, ReagentsGate } from "stores/reagents";

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

    const handleRowClick = (row: { id: string }) => {
        navigate({ to: `/reagents/${row.id}` });
    };

    const reagents = useUnit($ReagentsList);

    useEffect(() => {
        fetchReagentsFx();
    }, []);

    return (
        <Box>
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
                onRowClick={handleRowClick}
            />
            <Outlet />
        </Box>
    );
};
