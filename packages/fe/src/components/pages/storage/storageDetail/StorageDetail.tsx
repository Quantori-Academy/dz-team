import { Box, Typography } from "@mui/material";
import { useGate, useUnit } from "effector-react";

import { Grid } from "components/userDataGrid/Grid";
import { $DetailedStorage, DetailedGate } from "stores/storage";

const headers = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "name", headerName: "Name", width: 120 },
    { field: "structure", headerName: "Structure", width: 120 },
    { field: "description", headerName: "Description", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "unit", headerName: "Unit", width: 120 },
    { field: "size", headerName: "Size", width: 120 },
    { field: "expirationDate", headerName: "Expiration Date", width: 120 },
    { field: "cas", headerName: "Cas", width: 120 },
    { field: "producer", headerName: "Producer", width: 120 },
    { field: "catalogId", headerName: "Catalog Id", width: 120 },
    { field: "catalogLink", headerName: "Catalog Link", width: 120 },
    { field: "pricePerUnit", headerName: "Price Per Unit", width: 120 },
    { field: "category", headerName: "Category", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
];

const boxStyle = { display: "flex", flexDirection: "column", gap: "20px" };

export const StorageDetail = () => {
    useGate(DetailedGate);

    const detailedStorage = useUnit($DetailedStorage);

    const storage = detailedStorage?.storageLocation;
    const reagents = detailedStorage?.storageLocation?.reagents || [];

    return (
        <Box sx={boxStyle}>
            <Typography variant="h5">{storage?.name}</Typography>
            <Typography variant="h5">{storage?.room}</Typography>
            <Typography>{storage?.description}</Typography>
            <Grid rows={reagents} headers={headers} recordType="detailedReagents" />
        </Box>
    );
};
