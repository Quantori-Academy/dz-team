import { Box } from "@mui/material";
import { useGate, useUnit } from "effector-react";

import { Grid } from "components/userDataGrid/Grid";
import { $storageList, StorageGate } from "stores/storage";

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

    const storage = useUnit($storageList);

    const formattedStorage = storage.map((item) => ({
        id: item.id,
        name: item.name,
        room: item.room,
        description: item.description,
    }));

    return (
        <Box sx={BoxStyle}>
            <Grid rows={formattedStorage} headers={headers} recordType="storage" />
        </Box>
    );
};
