import { useContext } from "react";
import { toast } from "react-toastify";
import { Box, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useLoaderData, useNavigate, useRouter } from "@tanstack/react-router";

import { changeStatus } from "api/orderStatus";
import { TableContext } from "components/commonTable/TableContext";
import { Grid } from "components/dataGrid/Grid";
import { DetailsEditPage } from "components/DetailsEditPage/DetailsEditPage";
import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";
import { Order } from "shared/generated/zod/modelSchema";
import { OrderStatus } from "stores/order";
import { SupportedValue } from "utils/formatters";
import { deleteOrderAction, updateOrderAction } from "utils/orderActions";

import { CompleteOrder } from "./CompleteOrder";

const reagentColumns = [
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
    { label: "Seller", name: "seller" },
    { label: "Created at", name: "createdAt" },
];

const statusTransferRules: Record<string, string[]> = {
    pending: ["submitted"],
    submitted: ["canceled"],
    fulfilled: [],
    canceled: [],
};

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
    const router = useRouter();
    const tableRef = useContext(TableContext);

    const reagentData = Array.isArray(reagents) ? reagents : [];

    const handleAction = async (actionType: "submit" | "delete", data?: Order) => {
        if (actionType === "delete") {
            if (!data || !data.id) {
                toast.error("Order data or ID is missing for the delete action.", {
                    position: "bottom-left",
                });
                return;
            }
            await deleteOrderAction(data.id, navigate);
            toast.success("Order successfully deleted!", { position: "bottom-left" });
        } else if (actionType === "submit") {
            if (!data) {
                toast.error("Order data is missing for the submit action.", {
                    position: "bottom-left",
                });
                return;
            }
            await updateOrderAction(data, navigate);
            toast.success("Order successfully updated!", { position: "bottom-left" });
        }
    };

    const addModal = async (event: SelectChangeEvent<string>) => {
        const response = await createModal({
            name: "change_order_status_modal",
            message: `Are you sure you want to change the order's status to ${event.target.value}?`,
            labels: { ok: "Submit", cancel: "Cancel" },
        });

        if (response) {
            await changeStatus({
                id,
                status: event.target.value as OrderStatus,
            });
            if (tableRef.ref.current?.refresh != null) {
                tableRef.ref.current.refresh();
            }
            router.invalidate();
        }

        removeModal();
    };

    return (
        <DetailsEditPage
            baseUrl="/orders"
            url="/_app/_pOfficerLayout/orders/$id"
            fields={fields}
            onAction={handleAction}
            editableFields={["title", "description", "seller"]}
            addEditButton={status === "pending"}
        >
            <Box sx={boxStyle}>
                <Typography variant="h6" sx={{ mt: 6 }}>
                    Change Order Status
                </Typography>
                <Select
                    value={status}
                    id="select-status"
                    disabled={statusTransferRules[status].length < 1}
                    onChange={addModal}
                >
                    <MenuItem value={status}>{status}</MenuItem>
                    {statusTransferRules[status].map((val) => (
                        <MenuItem value={val} key={val}>
                            {val}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            {status === "submitted" ? <CompleteOrder orderId={id} reagents={reagentData} /> : null}

            {reagentData.length > 0 ? (
                <Box sx={boxStyle}>
                    <Typography variant="h6" sx={{ mt: 6 }}>
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
