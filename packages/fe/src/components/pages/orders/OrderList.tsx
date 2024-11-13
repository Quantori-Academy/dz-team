import { Box, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useGate, useUnit } from "effector-react";

import { ReusableGrid } from "components/dataGrid/ReusableGrid";
import { OrdersGate } from "stores/orders/orderGate";
import { $OrdersList } from "stores/orders/orderStore";

const headers = [
    { field: "id", headerName: "Order ID", width: 150 },
    // { field: "title", headerName: "Title", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 170 },
    { field: "status", headerName: "Status ", width: 170 },
    { field: "creationDate", headerName: "Creation Date", width: 170 },
];
const placeholder = "Search by seller, status";

const boxStyles = {
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
};

export const OrderList = () => {
    useGate(OrdersGate);
    const orders = useUnit($OrdersList);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate({ to: "/orders/create" });
    };

    return (
        <Box sx={boxStyles}>
            <Typography variant="h5">Order List</Typography>
            <ReusableGrid
                rows={orders}
                headers={headers}
                onAddRecord={handleClick}
                addRecordLabel="Add New Order"
                placeholder={placeholder}
            />
        </Box>
    );
};
