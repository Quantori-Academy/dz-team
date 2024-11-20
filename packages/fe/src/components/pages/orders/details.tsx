import { Box, Typography } from "@mui/material";
import { useLoaderData } from "@tanstack/react-router";

import { OrderDetails } from "api/orderDetails/contract";
import { DetailsEditPage } from "components/DetailsEditPage/DetailsEditPage";

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

export function OrderDetailsPage() {
    const { reagents } = useLoaderData({ from: "/_app/_pOfficerLayout/orders/$id" });

    if (!reagents) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Typography variant="h6">Order not found.</Typography>
            </Box>
        );
    }

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

    const handleAction = async (_actionType: "submit" | "delete", _data?: OrderDetails) => {
        // if (actionType === "delete") {
        //     await deleteReagentAction(order.id, navigate);
        // } else if (actionType === "submit" && data) {
        //     setIsEditing(false);
        //     await updateReagentAction(data, navigate);
        // }
    };

    const dataGridProps = reagents?.length
        ? {
              rows: reagents,
              headers: reagentColumns,
          }
        : undefined;

    return (
        <DetailsEditPage
            baseUrl="/orders"
            url="/_app/_pOfficerLayout/orders/$id"
            fields={fields}
            onAction={handleAction}
            dataGridProps={dataGridProps}
        />
    );
}
