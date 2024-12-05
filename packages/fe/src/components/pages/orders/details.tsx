import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useLoaderData, useNavigate } from "@tanstack/react-router";

import { Grid } from "components/dataGrid/Grid";
import { DetailsEditPage } from "components/DetailsEditPage/DetailsEditPage";
import { Order } from "shared/generated/zod/modelSchema";
import { SupportedValue } from "utils/formatters";
import { updateOrderAction, updateOrderStatus } from "utils/orderActions";

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
    { field: "amount", headerName: "Amount", width: 180 },
];

const fields = [
    { label: "Title", name: "title" },
    { label: "Description", name: "description" },
    // { label: "Status", name: "status" },
    { label: "Seller", name: "seller" },
    { label: "Created at", name: "createdAt" },
];

const boxStyle = { display: "flex", flexDirection: "column", gap: "20px" };

export function OrderDetailsPage() {
    const {
        reagents,
        id,
        status,
    }: { reagents: Record<string, SupportedValue>[] | null; id: string; status: string } =
        useLoaderData({
            from: "/_app/_pOfficerLayout/orders/$id",
        });
    const navigate = useNavigate();
    const reagentData = Array.isArray(reagents) ? reagents : [];
    const [isEditingStatus, setIsEditingStatus] = useState(false);
    const [newStatus, setNewStatus] = useState(status);

    const handleAction = async (actionType: "submit" | "delete", data?: Order) => {
        if (!data) {
            return;
        } else if (actionType === "submit" && data) {
            // setIsEditing(false);
            await updateOrderAction(data, navigate);
        }
    };
    const handleStatusChange = async () => {
        await updateOrderStatus({ id, status: newStatus }, navigate);
        setIsEditingStatus(false);
    };
    const handleCancelEdit = () => {
        setIsEditingStatus(false);
        setNewStatus(status);
    };

    return (
        <DetailsEditPage
            baseUrl="/orders"
            url="/_app/_pOfficerLayout/orders/$id"
            fields={fields}
            onAction={handleAction}
            editableFields={["title", "description", "seller"]}
        >
            <Box sx={boxStyle}>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Change Order Status
                </Typography>
                <TextField
                    label="Status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    disabled={!isEditingStatus}
                    sx={{ width: "50%" }}
                />
                <Box sx={{ display: "flex", gap: "10px", mt: 2 }}>
                    {isEditingStatus ? (
                        <>
                            <Button variant="contained" onClick={handleStatusChange}>
                                Update
                            </Button>
                            <Button variant="outlined" onClick={handleCancelEdit}>
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button variant="contained" onClick={() => setIsEditingStatus(true)}>
                            Edit
                        </Button>
                    )}
                </Box>
            </Box>
            {reagentData.length > 0 ? (
                <Box sx={boxStyle}>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Reagents
                    </Typography>
                    <Grid
                        rows={reagentData}
                        headers={reagentColumns}
                        showSearchField={false}
                        showToolbar={false}
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
