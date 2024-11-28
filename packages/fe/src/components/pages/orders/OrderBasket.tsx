import { Box, Button, TextField } from "@mui/material";
import { useUnit } from "effector-react";
import { jwtDecode } from "jwt-decode";

import { CreateOrderReagent } from "api/orderDetails/contract";
import { $auth } from "stores/auth";
import { OrderStatus, setOrderData, submitOrder } from "stores/order";

type BasketProps = {
    basket: { reagent: CreateOrderReagent; quantity: number }[];
    title: string;
    seller: string;
    description: string;
    setTitle: (title: string) => void;
    setSeller: (seller: string) => void;
    setDescription: (seller: string) => void;
};
export function OrderBasket({
    basket,
    title,
    seller,
    description,
    setTitle,
    setSeller,
    setDescription,
}: BasketProps) {
    const submitOrderEvent = useUnit(submitOrder);

    const auth = useUnit($auth);
    let userId = null;

    if (auth && auth.self) {
        const token = auth.token;
        const decodedToken = jwtDecode(token);

        if (decodedToken?.userId) {
            userId = decodedToken.userId;
        } else {
            alert("User ID not found in the token");
        }
    }

    const handleCreateOrder = () => {
        const orderData = {
            title,
            seller: seller || "",
            status: OrderStatus.pending,
            userId: userId,
            description,
            reagents: basket.map(({ reagent }) => ({
                id: reagent.id,
                name: reagent.name || "",
                structure: reagent.structure || "",
                quantity: reagent.quantity || 0,
                units: reagent.units || "ml",
                cas: reagent.cas || "",
                producer: reagent.producer || "",
                catalogId: reagent.catalogId || "",
                catalogLink: reagent.catalogLink || "https://www.example.com/catalog/product-123",
                pricePerUnit: reagent.pricePerUnit || 0,
                amount: reagent.amount,
            })),
        };
        setOrderData(orderData);
        submitOrderEvent();
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Box sx={{ display: "flex", gap: "20px", mt: 2 }}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="outlined"
                    fullWidth
                    required
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Seller"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                    variant="outlined"
                    fullWidth
                    required
                    sx={{ mt: 2 }}
                />
            </Box>
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                fullWidth
                required
                sx={{ mt: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleCreateOrder} sx={{ mt: 2 }}>
                Create Order
            </Button>
        </Box>
    );
}
