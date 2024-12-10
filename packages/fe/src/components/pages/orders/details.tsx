import { Box, Typography } from "@mui/material";
import { useLoaderData } from "@tanstack/react-router";

import { Grid } from "components/dataGrid/Grid";
import { DetailsEditPage } from "components/DetailsEditPage/DetailsEditPage";
import { Order } from "shared/generated/zod/modelSchema";
import { SupportedValue } from "utils/formatters";

const reagentColumns = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "name", headerName: "Name", width: 120 },
    { field: "structure", headerName: "Structure", width: 180 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "cas", headerName: "CAS", width: 120 },
    { field: "producer", headerName: "Producer", width: 180 },
    { field: "catalogId", headerName: "Catalog Id", width: 120 },
    { field: "catalogLink", headerName: "Catalog Link", width: 120 },
    { field: "pricePerUnit", headerName: "Price per unit", width: 180 },
];

const fields = [
    { label: "ID", name: "id", disabled: true },
    { label: "Title", name: "title" },
    { label: "Description", name: "description" },
    { label: "Status", name: "status" },
    { label: "Seller", name: "seller" },
    { label: "Deleted at", name: "deletedAt" },
    { label: "Created at", name: "createdAt" },
    { label: "User Id", name: "userId" },
];

const boxStyle = { display: "flex", flexDirection: "column", gap: "20px" };

export function OrderDetailsPage() {
    const { reagents }: { reagents: Record<string, SupportedValue>[] | null } = useLoaderData({
        from: "/_app/_pOfficerLayout/orders/$id",
    });
    const reagentData = Array.isArray(reagents) ? reagents : [];

    const handleAction = async (_actionType: "submit" | "delete", _data?: Order) => {
        // TODO: action buttons will be done in the other branch
    };

    return (
        <DetailsEditPage
            baseUrl="/orders"
            url="/_app/_pOfficerLayout/orders/$id"
            fields={fields}
            onAction={handleAction}
        >
            {reagentData.length > 0 ? (
                <Box sx={boxStyle}>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Reagents
                    </Typography>
                    <Grid
                        rows={reagentData}
                        headers={reagentColumns}
                        showSearchField={false}
                        showAddRecord={false}
                    />
                </Box>
            ) : (
                <Box sx={boxStyle}>
                    <Typography>No reagents in this order.</Typography>
                </Box>
            )}
        </DetailsEditPage>
    );
}
