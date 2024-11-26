import { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Outlet } from "@tanstack/react-router";

import { CreateOrderReagent } from "api/orderDetails/contract";
import { CommonTable } from "components/commonTable/CommonTable";
import LayoutBox from "components/LayoutBox/LayoutBox";
import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";
import { OrderReagentsSchema } from "shared/zodSchemas/order/orderReagentSchema";

import { OrderBasket } from "./OrderBasket";
import { OrderReagentDetail } from "./OrderReagentDetailPage";
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
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [basketDrawerOpen, setBasketDrawerOpen] = useState(false);
    const [basket, setBasket] = useState<{ reagent: CreateOrderReagent; quantity: number }[]>([]);
    const [title, setTitle] = useState("");
    const [seller, setSeller] = useState("");
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const toggleBasketDrawer = () => setBasketDrawerOpen(!basketDrawerOpen);

    const handleRowClick = (row: CreateOrderReagent) => {
        setSelectedReagent(row);
        setIsDrawerOpen(true);
    };
    const openAddModal = async () => {
        try {
            await createModal({
                name: "reagent_modal",
                title: "Add new Reagent",
                message: (
                    <OrderReagentFormModal
                        onSubmit={(newReagent: CreateOrderReagent) => {
                            setReagents((prevReagents) => [...prevReagents, newReagent]);
                            removeModal();
                        }}
                        onCancel={() => {
                            removeModal();
                        }}
                        onAddToOrder={handleAddToOrder}
                    />
                ),
            });
        } catch (_) {
            removeModal();
        }
    };
    const handleAddToOrder = (newReagent: CreateOrderReagent) => {
        setBasket((prevBasket) => {
            const existingItem = prevBasket.find((item) => item.reagent.id === newReagent.id);
            if (existingItem) {
                return prevBasket.map((item) =>
                    item.reagent.id === newReagent.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                );
            }
            return [...prevBasket, { reagent: newReagent, quantity: 1 }];
        });
        setIsDrawerOpen(false);
        setTitle("");
        setSeller("");
        setDescription("");
    };
    const handleDeleteReagent = () => {
        if (selectedReagent) {
            setReagents((prevReagents) =>
                prevReagents.filter((reagent) => reagent.id !== selectedReagent.id),
            );
            setBasket((prevBasket) =>
                prevBasket.filter((item) => item.reagent.id !== selectedReagent.id),
            );
            setIsDrawerOpen(false);
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

    const handleDeleteFromBasket = (id: string) => {
        setBasket((prevBasket) => prevBasket.filter((item) => item.reagent.id !== id));
    };
    const handleClearBasket = () => {
        setBasket([]);
        setErrorMessage("");
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        setSelectedReagent(null);
        setTitle("");
        setSeller("");
        setDescription("");
        setErrorMessage("");
    };

    return (
        <>
            <LayoutBox>
                <CommonTable<CreateOrderReagent>
                    rows={reagents}
                    columns={headers}
                    schema={OrderReagentsSchema}
                    onRowClick={(row: CreateOrderReagent) => handleRowClick(row)}
                    searchBy={{
                        name: true,
                    }}
                    onAdd={openAddModal}
                    addButtonText="Create a new reagent for an order"
                    iconProps={{
                        badgeContent: basket.length,
                        color: "primary",
                        onClick: toggleBasketDrawer,
                    }}
                    icon={<ShoppingCartIcon />}
                />
                <OrderReagentDetail
                    selectedReagent={selectedReagent}
                    onClose={handleDrawerClose}
                    open={isDrawerOpen}
                    fields={headers}
                    onDeleteReagent={handleDeleteReagent}
                    onEditReagent={(updatedReagent) => {
                        handleEditReagent(updatedReagent);
                        handleUpdateBasketReagent(updatedReagent);
                    }}
                />
                <OrderBasket
                    basket={basket}
                    title={title}
                    seller={seller}
                    description={description}
                    setTitle={setTitle}
                    setSeller={setSeller}
                    setDescription={setDescription}
                    handleDeleteFromBasket={handleDeleteFromBasket}
                    handleClearBasket={handleClearBasket}
                    errorMessage={errorMessage}
                    open={basketDrawerOpen}
                    onClose={toggleBasketDrawer}
                />
            </LayoutBox>
            <Outlet />
        </>
    );
};
