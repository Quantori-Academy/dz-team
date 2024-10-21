import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
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
    const handleActionClick = () => {
        alert(`click!`);
    };

    const reagents = useUnit($ReagentsList);

    useEffect(() => {
        fetchReagentsFx();
    }, []);

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
            />
        </Box>
    );
};
