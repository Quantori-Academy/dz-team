import { Box, Typography } from "@mui/material";
import { useLoaderData } from "@tanstack/react-router";
import { Route as storageDetailRoute } from "routes/_app/storage/$id";

import { StorageLocationContractType } from "api/storage/storageDetail";
import { Grid } from "components/dataGrid/Grid";
import { DetailsEditPage } from "components/DetailsEditPage/DetailsEditPage";

const reagentColumns = [
    { field: "name", headerName: "Name", width: 120 },
    { field: "structure", headerName: "Structure", width: 120 },
    { field: "description", headerName: "Description", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "expirationDate", headerName: "Expiration Date", width: 120 },
    { field: "producer", headerName: "Producer", width: 120 },
    { field: "category", headerName: "Category", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
];

const fields = [
    { label: "Name", name: "name", required: true },
    { label: "Room", name: "room", required: true },
    { label: "Created At", name: "createdAt", disabled: true },
    { label: "Updated At", name: "updatedAt", disabled: true },
    { label: "Description", name: "description", required: false },
];
const boxStyle = { display: "flex", flexDirection: "column", gap: "20px" };

export const StorageDetail = () => {
    const { reagents } = useLoaderData({
        from: "/_app/storage/$id",
    });

    const permissions = {
        canEdit: false,
        canDelete: false,
    };

    return (
        <Box sx={boxStyle}>
            <DetailsEditPage<typeof storageDetailRoute, StorageLocationContractType>
                baseUrl="/storage"
                url="/_app/storage/$id"
                fields={fields}
                permissions={permissions}
            >
                {reagents.length > 0 ? (
                    <Box sx={boxStyle}>
                        <Typography variant="h6">Reagents</Typography>
                        <Grid
                            rows={reagents}
                            headers={reagentColumns}
                            recordType="detailedStorage"
                        />
                    </Box>
                ) : (
                    <Typography>No reagents available for this storage.</Typography>
                )}
            </DetailsEditPage>
        </Box>
    );
};
