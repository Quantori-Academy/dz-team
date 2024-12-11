import { useCallback, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { Outlet } from "@tanstack/react-router";

import { CreateOrderReagent } from "api/order/contract";
import { AddRecord } from "components/dataGrid/Addrecord";
import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";
import { useReagents } from "hooks/useReagents";

import { OrderBasket } from "./OrderBasket";
import { OrderReagentFormModal } from "./OrderReagentFormModal";

const headers = [
    { field: "name", headerName: "Name", width: 150, editable: true },
    { field: "structure", headerName: "Structure", width: 170, editable: true },
    { field: "cas", headerName: "Cas", width: 170, editable: true },
    { field: "producer", headerName: "Producer", width: 170, editable: true },
    { field: "catalogId", headerName: "Catalog Id", width: 150, editable: true },
    { field: "catalogLink", headerName: "Catalog Link", width: 170, editable: true },
    { field: "unit", headerName: "Unit ", width: 170, editable: true },
    { field: "pricePerUnit", headerName: "Price Per Unit", width: 170, editable: true },
    { field: "quantity", headerName: "Quantity", width: 17, editable: true },
    { field: "amount", headerName: "Amount", width: 170, editable: true },
];

export const CreateOrder = () => {
    const { orderItems, deleteReagent, editReagent, addReagent, setOrderItems } = useReagents();
    const [title, setTitle] = useState("");
    const [seller, setSeller] = useState("");
    const [description, setDescription] = useState("");

    const clearBasket = useCallback(() => {
        setTitle("");
        setSeller("");
        setDescription("");
        setOrderItems([]);
    }, [setTitle, setSeller, setDescription, setOrderItems]);

    const handleRowClick = (row: CreateOrderReagent) => {
        createModal({
            name: "reagent_modal",
            title: "Edit Reagent",
            message: (
                <OrderReagentFormModal
                    selectedReagent={row}
                    onSubmit={(updatedReagent: CreateOrderReagent) => {
                        editReagent(updatedReagent);
                        removeModal();
                    }}
                    onDelete={() => {
                        deleteReagent(row);
                        removeModal();
                    }}
                    onCancel={removeModal}
                />
            ),
        });
    };

    const openAddModal = () => {
        createModal({
            name: "reagent_modal",
            title: "Add new Reagent",
            message: (
                <OrderReagentFormModal
                    onSubmit={(newReagent: CreateOrderReagent) => {
                        addReagent(newReagent);
                        removeModal();
                    }}
                    onCancel={removeModal}
                />
            ),
        });
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
            }}
            gap={2}
        >
            <OrderBasket
                basket={orderItems}
                title={title}
                seller={seller}
                description={description}
                setTitle={setTitle}
                setSeller={setSeller}
                setDescription={setDescription}
                clearBasket={clearBasket}
            />
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "330px" }}>
                <DataGrid
                    rows={orderItems}
                    columns={headers}
                    onRowClick={(params: GridRowParams<CreateOrderReagent>) =>
                        handleRowClick(params.row)
                    }
                    slots={{
                        toolbar: () => (
                            <AddRecord
                                buttonLabel="Create a new reagent for an order"
                                onAddRecord={openAddModal}
                            />
                        ),
                    }}
                />
            </Box>
            <Outlet />
        </Box>
    );
};
