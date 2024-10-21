import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useGate, useUnit } from "effector-react";
import { theme } from "theme";

import { DataGridTable } from "components/gridTable/DataGridTable";
import { $ReagentsList, fetchReagentsFx, ReagentsGate } from "stores/reagents";

export const ReagentsListPage = () => {
    useGate(ReagentsGate);
    const reagents = useUnit($ReagentsList);

    useEffect(() => {
        fetchReagentsFx();
    }, []);

    const headers = [
        { field: "name", headername: "Name" },
        { field: "structure", headername: "Structure" },
        { field: "description", headername: "Description" },
        { field: "quantity", headername: "Quantity" },
        { field: "unit", headername: "Unit" },
        { field: "size", headername: "Size" },
        { field: "expirationDate", headername: "Expiration Date" },
        { field: "storageLocation", headername: "Storage Location" },
        { field: "cas", headername: "CAS" },
        { field: "producer", headername: "Producer" },
        { field: "catalogId", headername: "Catalog ID" },
        { field: "catalogLink", headername: "Catalog Link" },
        { field: "pricePerUnit", headername: "Price Per Unit" },
    ];
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
            <DataGridTable data={reagents} headers={headers} />
        </Box>
    );
};
