import { Box } from "@mui/material";
import { useGate, useUnit } from "effector-react";

import { Grid } from "components/userDataGrid/Grid";
import { $StorageList, StorageGate } from "stores/storage";

const headers = [
    { field: "name", headerName: "Storage Name", width: 170 },
    { field: "room", headerName: "Storage Room", width: 170 },
    { field: "description", headerName: "Storage Description", width: 170 },
    { field: "reagentsCount", headerName: "Reagents number", width: 170 },
];

const BoxStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
};

export const StorageList = () => {
    useGate(StorageGate);

    const storage = useUnit($StorageList);

    const rows = storage.map((item) => {
        const [room, name] = item.storageLocation.name.split(", ");
        return {
            id: item.storageLocation.id,
            room,
            name,
            description: item.storageLocation.description,
            reagentsCount: item.reagents.length,
        };
    });

    return (
        <Box sx={BoxStyle}>
            <Grid rows={rows} headers={headers} recordType="storage" />
        </Box>
    );
};
