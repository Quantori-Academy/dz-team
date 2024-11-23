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
    { field: "id", headerName: "id", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "structure", headerName: "Structure", width: 170 },
    { field: "cas", headerName: "Cas", width: 170 },
    { field: "producer", headerName: "Producer", width: 170 },
    { field: "catalogId", headerName: "Catalog Id", width: 150 },
    { field: "catalogLink", headerName: "Catalog Link", width: 170 },
    { field: "units", headerName: "Units ", width: 170 },
    { field: "pricePerUnit", headerName: "Price Per Unit", width: 170 },
    { field: "quantity", headerName: "Quantity", width: 170 },
    { field: "amount", headerName: "Amount", width: 170 },
];
export const CreateOrder = () => {
    const [reagents, setReagents] = useState<CreateOrderReagent[]>([]);
    const [selectedReagent, setSelectedReagent] = useState<CreateOrderReagent | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [basketDrawerOpen, setBasketDrawerOpen] = useState(false);
    const [basket, setBasket] = useState<{ reagent: CreateOrderReagent; quantity: number }[]>([]);
    const [title, setTitle] = useState("");
    const [seller, setSeller] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const toggleBasketDrawer = () => setBasketDrawerOpen(!basketDrawerOpen);
    const sellerOptions = ["Seller A", "Seller B", "Seller C", "Seller D"];

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
                    />
                ),
            });
        } catch (_) {
            removeModal();
        }
    };
    const handleAddToOrder = () => {
        if (selectedReagent) {
            setBasket((prevBasket) => {
                const existingItem = prevBasket.find(
                    (item) => item.reagent.id === selectedReagent.id,
                );
                if (existingItem) {
                    return prevBasket.map((item) =>
                        item.reagent.id === selectedReagent.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item,
                    );
                }
                return [...prevBasket, { reagent: selectedReagent, quantity: 1 }];
            });
            setIsDrawerOpen(false);
            setTitle("");
            setSeller("");
        }
    };
    const handleQuantityChange = (id: string, change: number) => {
        setBasket((prevBasket) => {
            return prevBasket.map((item) => {
                if (item.reagent.id === id) {
                    const newQuantity = item.quantity + change;
                    if (newQuantity > item.reagent.quantity) {
                        setErrorMessage(
                            `Cannot exceed available quantity of ${item.reagent.quantity}.`,
                        );
                        return item;
                    } else {
                        setErrorMessage("");
                        return { ...item, quantity: Math.max(1, newQuantity) };
                    }
                }
                return item;
            });
        });
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
                    onAddToOrder={handleAddToOrder}
                    onClose={handleDrawerClose}
                    open={isDrawerOpen}
                    fields={headers}
                />
                <OrderBasket
                    basket={basket}
                    title={title}
                    seller={seller}
                    setTitle={setTitle}
                    setSeller={setSeller}
                    handleQuantityChange={handleQuantityChange}
                    handleDeleteFromBasket={handleDeleteFromBasket}
                    handleClearBasket={handleClearBasket}
                    errorMessage={errorMessage}
                    sellerOptions={sellerOptions}
                    open={basketDrawerOpen}
                    onClose={toggleBasketDrawer}
                />
            </LayoutBox>
            <Outlet />
        </>
    );
};
