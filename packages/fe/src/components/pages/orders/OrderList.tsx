import { useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import { useGate, useUnit } from "effector-react";

import { ReusableGrid } from "components/dataGrid/ReusableGrid";
import { OrdersGate } from "stores/orders/orderGate";
import { $OrdersList } from "stores/orders/orderStore";

import { AddOrderForm } from "./AddOrderForm";

const headers = [
    { field: "id", headerName: "Order ID", width: 150 },
    { field: "reagentName", headerName: "Reagent Name", width: 150 },
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <Box sx={boxStyles}>
            <Typography variant="h5">Order List</Typography>
            <ReusableGrid
                rows={orders}
                headers={headers}
                onAddRecord={handleOpenModal}
                addRecordLabel="Add New Order"
                placeholder={placeholder}
            />

            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <AddOrderForm onClose={handleCloseModal} />
            </Modal>
        </Box>
    );
};
