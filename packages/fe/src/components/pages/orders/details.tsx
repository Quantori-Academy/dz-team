import { useContext } from "react";
import { toast } from "react-toastify";
import { Box, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useLoaderData, useNavigate, useRouter } from "@tanstack/react-router";

import { deleteOrder } from "api/order/deleteOrder";
import { updateOrder } from "api/order/updateOrder";
import { changeStatus } from "api/orderStatus";
import { TableContext } from "components/commonTable/TableContext";
import { Grid } from "components/dataGrid/Grid";
import { DetailsEditPage } from "components/DetailsEditPage/DetailsEditPage";
import { createModal } from "components/modal/createModal";
import { Order } from "shared/generated/zod/modelSchema";
import { type OrderStatus } from "stores/order";
import { SupportedValue } from "utils/formatters";

const reagentColumns = [
    { field: "name", headerName: "Name", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 80 },
    { field: "amount", headerName: "Amount", width: 80 },
    { field: "producer", headerName: "Producer", width: 180 },
    { field: "pricePerUnit", headerName: "Price per unit", width: 102 },
    { field: "catalogId", headerName: "Catalog Id", width: 120 },
    { field: "catalogLink", headerName: "Catalog Link", width: 120 },
    { field: "cas", headerName: "CAS", width: 120 },
    { field: "structure", headerName: "Structure", width: 180 },
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
        if (!data) {
            toast.error("Order data is missing");
            return;
        }
        if (actionType === "delete") {
            await deleteOrder(data.id);
            navigate({ to: "/orders" });
        } else {
            await updateOrder(data);
        }
        toast.success(`Order successfully ${actionType === "delete" ? "deleted" : "updated"}!`);
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

            tableRef.ref.current?.refresh();
            router.invalidate();
        }
    };

    return (
        <DetailsEditPage
            baseUrl="/orders"
            url="/_app/_pOfficerLayout/orders/$id"
            fields={fields}
            onAction={handleAction}
            editableFields={["title", "description", "seller"]}
            addEditButton={status === "pending"}
            addDeleteButton={status === "pending"}
        >
            <Box sx={{ display: "flex", flexDirection: "column" }} gap={2} pt={1}>
                <Typography variant="h6">Change Order Status</Typography>
                <Select
                    value={status}
                    id="select-status"
                    disabled={statusTransferRules[status].length < 1}
                    onChange={addModal}
                    fullWidth
                >
                    <MenuItem value={status}>{status}</MenuItem>
                    {statusTransferRules[status].map((val) => (
                        <MenuItem value={val} key={val}>
                            {val}
                        </MenuItem>
                    ))}
                </Select>
                {reagentData.length > 0 ? (
                    <>
                        <Typography variant="h6">Reagents</Typography>
                        <Grid
                            rows={reagentData}
                            headers={reagentColumns}
                            showSearchField={false}
                            showToolbar={false}
                        />
                    </>
                ) : (
                    <Typography>No reagents in this order.</Typography>
                )}
            </Box>
        </DetailsEditPage>
    );
}
