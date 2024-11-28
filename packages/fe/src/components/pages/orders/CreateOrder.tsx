import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import { Outlet } from "@tanstack/react-router";

import { CreateOrderReagent } from "api/orderDetails/contract";
import { AddRecord } from "components/dataGrid/Addrecord";
import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";

import { OrderBasket } from "./OrderBasket";
import { OrderReagentFormModal } from "./OrderReagentFormModal";

const headers = [
    { field: "id", headerName: "id", width: 150, editable: false },
    { field: "name", headerName: "Name", width: 150, editable: true },
    { field: "structure", headerName: "Structure", width: 170, editable: true },
    { field: "cas", headerName: "Cas", width: 170, editable: true },
    { field: "producer", headerName: "Producer", width: 170, editable: true },
    { field: "catalogId", headerName: "Catalog Id", width: 150, editable: true },
    { field: "catalogLink", headerName: "Catalog Link", width: 170, editable: true },
    { field: "units", headerName: "Units ", width: 170, editable: true },
    { field: "pricePerUnit", headerName: "Price Per Unit", width: 170, editable: true },
    { field: "quantity", headerName: "Quantity", width: 17, editable: true },
    { field: "amount", headerName: "Amount", width: 170, editable: true },
];
export const CreateOrder = () => {
    const [reagents, setReagents] = useState<CreateOrderReagent[]>([]);
    const [selectedReagent, setSelectedReagent] = useState<CreateOrderReagent | null>(null);
    const [basket, setBasket] = useState<{ reagent: CreateOrderReagent; quantity: number }[]>([]);
    const [title, setTitle] = useState("");
    const [seller, setSeller] = useState("");
    const [description, setDescription] = useState("");

    const handleDeleteReagent = (reagentToDelete: CreateOrderReagent) => {
        if (reagentToDelete) {
            setReagents((prevReagents) =>
                prevReagents.filter((reagent) => reagent.id !== reagentToDelete.id),
            );
            setBasket((prevBasket) =>
                prevBasket.filter((item) => item.reagent.id !== reagentToDelete.id),
            );
            setSelectedReagent(null);
            removeModal();
        } else {
            alert("No reagent selected for deletion");
        }
    };
    const handleEditReagent = (updatedReagent: CreateOrderReagent) => {
        setReagents((prevReagents) =>
            prevReagents.map((reagent) =>
                reagent.id === updatedReagent.id ? updatedReagent : reagent,
            ),
        );
        setSelectedReagent(updatedReagent);
    };
    const handleUpdateBasketReagent = (updatedReagent: CreateOrderReagent) => {
        setBasket((prevBasket) =>
            prevBasket.map((item) =>
                item.reagent.id === updatedReagent.id ? { ...item, reagent: updatedReagent } : item,
            ),
        );
    };
    const handleRowClick = async (row: CreateOrderReagent) => {
        setSelectedReagent(row);
        try {
            await createModal({
                name: "reagent_modal",
                title: "Edit Reagent",
                message: (
                    <OrderReagentFormModal
                        mode="view"
                        selectedReagent={row}
                        onSubmit={(updatedReagent: CreateOrderReagent) => {
                            handleEditReagent(updatedReagent);
                            handleUpdateBasketReagent(updatedReagent);
                            removeModal();
                        }}
                        onDelete={() => {
                            handleDeleteReagent(row);
                            removeModal();
                        }}
                        onCancel={() => {
                            removeModal();
                        }}
                    />
                ),
            });
        } catch (_) {
            removeModal();
        }
    };

    const openAddModal = async () => {
        try {
            await createModal({
                name: "reagent_modal",
                title: "Add new Reagent",
                message: (
                    <OrderReagentFormModal
                        mode="create"
                        selectedReagent={selectedReagent}
                        onSubmit={(newReagent: CreateOrderReagent) => {
                            setReagents((prevReagents) => [...prevReagents, newReagent]);
                            removeModal();
                        }}
                        onCancel={() => {
                            setSelectedReagent(null);
                            removeModal();
                        }}
                    />
                ),
            });
        } catch (_) {
            removeModal();
        }
    };
    return (
        <>
            <Box
                sx={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <OrderBasket
                    basket={basket}
                    title={title}
                    seller={seller}
                    description={description}
                    setTitle={setTitle}
                    setSeller={setSeller}
                    setDescription={setDescription}
                />
                <DataGrid
                    rows={reagents}
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
        </>
    );
};
