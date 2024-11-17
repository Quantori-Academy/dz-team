import { Box, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useGate, useUnit } from "effector-react";
import { storageDetailRoute } from "routes/_app/_researcherLayout/storage/$id";

import { deleteStorage } from "api/storage/deleteStorage";
import { Grid } from "components/dataGrid/Grid";
import { DetailsEditPage } from "components/DetailsEditPage/DetailsEditPage";
import { Reagent, StorageLocation } from "shared/generated/zod";
import { $detailedStorage, DetailedGate } from "stores/storage";

const reagentColumns = [
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
    const navigate = useNavigate();
    const detailedStorage = useUnit($detailedStorage);

    const reagents = detailedStorage?.reagents || [];

    const handleAction = async (
        type: "submit" | "delete",
        data?: (StorageLocation & { reagents: Reagent[] }) | null,
    ) => {
        if (type === "submit" && data) {
            // Add your editStorage logic here, if applicable
            // await editStorage(data.id, data);
        } else if (type === "delete" && data) {
            await deleteStorage(data.id); // API call to delete storage
            navigate({ to: "/storage", replace: true }); // Navigate back to storage list
        }
    };

    const fields = [
        { label: "ID", name: "id", disabled: true },
        { label: "Name", name: "name", required: true },
        { label: "Room", name: "room", required: true },
        { label: "Number of Reagents", name: "reagentsCount", disabled: true },
        { label: "Created At", name: "createdAt", disabled: true },
        { label: "Updated At", name: "updatedAt", disabled: true },
        { label: "Deleted At", name: "deletedAt", disabled: true },
        { label: "Description", name: "description", required: false },
    ];

    return (
        <Box sx={boxStyle}>
            <DetailsEditPage<
                typeof storageDetailRoute,
                (StorageLocation & { reagents: Reagent[] }) | null
            >
                baseUrl="/storage"
                url="/_app/_researcherLayout/storage/$id"
                fields={fields}
                onAction={handleAction}
                editableFields={["name", "room", "description"]}
            >
                {reagents.length > 0 ? (
                    <Box sx={{ marginTop: "20px" }}>
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
