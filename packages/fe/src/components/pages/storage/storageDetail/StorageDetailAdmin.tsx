import { useState } from "react";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
import { useLoaderData } from "@tanstack/react-router";
import { Route as storageDetailRoute } from "routes/_app/storage/$id";

import { deleteStorage } from "api/storage/deleteStorage";
// import { editStorage } from "api/storage/editStorage";
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

export const StorageDetailAdmin = () => {
    const { reagents } = useLoaderData({
        from: "/_app/storage/$id",
    });

    const permissions = {
        canEdit: true,
        canDelete: true,
    };
    const [notification, setNotification] = useState<{
        type: "success" | "error" | "warning";
        message: string;
    } | null>(null);

    const handleAction = async (type: "submit" | "delete", data?: StorageLocationContractType) => {
        // console.log(data, "sdcs");
        if (type === "submit" && data) {
            // await editStorage(data.id, data);
        } else if (type === "delete" && data) {
            if (reagents.length > 0) {
                setNotification({
                    type: "warning",
                    message: "Cannot delete storage with existing reagents.",
                });
                return;
            }
            try {
                await deleteStorage(data.id);
                setNotification({
                    type: "success",
                    message: "Storage deleted successfully.",
                });
            } catch (_error) {
                setNotification({
                    type: "error",
                    message: "Failed to delete storage.",
                });
            }
        }
    };

    return (
        <Box sx={boxStyle}>
            <DetailsEditPage<typeof storageDetailRoute, StorageLocationContractType>
                baseUrl="/storage"
                url="/_app/storage/$id"
                fields={fields}
                onAction={permissions.canDelete || permissions.canEdit ? handleAction : undefined}
                editableFields={permissions.canEdit ? ["name", "room", "description"] : []}
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
                    <Box sx={boxStyle}>
                        <Typography>No reagents available for this storage.</Typography>
                    </Box>
                )}
            </DetailsEditPage>
            {notification && (
                <Snackbar
                    open={!!notification}
                    autoHideDuration={3000}
                    onClose={() => setNotification(null)}
                >
                    <Alert
                        onClose={() => setNotification(null)}
                        severity={notification.type}
                        sx={{ width: "100%" }}
                    >
                        {notification.message}
                    </Alert>
                </Snackbar>
            )}
        </Box>
    );
};
