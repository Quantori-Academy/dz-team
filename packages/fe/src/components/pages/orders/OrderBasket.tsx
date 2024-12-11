import { useState } from "react";
import { toast } from "react-toastify";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useUnit } from "effector-react";

import { CreateOrderReagent } from "api/order/contract";
import { $auth } from "stores/auth";
import { OrderStatus, setOrderData, submitOrderFx } from "stores/order";
import { validateInput } from "utils/validationInput";

type BasketProps = {
    basket: CreateOrderReagent[];
    title: string;
    seller: string;
    description: string;
    setTitle: (title: string) => void;
    setSeller: (seller: string) => void;
    setDescription: (seller: string) => void;
    clearBasket: () => void;
};

const validationRules = {
    title: {
        required: true,
        maxLength: 200,
    },
    seller: {
        required: false,
        maxLength: 200,
    },
    description: {
        required: false,
    },
};

export function OrderBasket({
    basket,
    title,
    seller,
    description,
    setTitle,
    setSeller,
    setDescription,
    clearBasket,
}: BasketProps) {
    const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
    const auth = useUnit($auth);
    const userId = auth && typeof auth !== "boolean" ? auth.userId : null;
    const navigate = useNavigate();

    const handleCreateOrder = async () => {
        const formData = { title, seller, description };
        const validationErrors = validateInput(formData, validationRules);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return toast.error("Order creation failed!");
        }
        if (!userId) {
            return toast.error(
                "Looks like your authorization is broken! Please re-login and try again",
            );
        }
        const orderData = {
            title,
            seller: seller || "",
            status: OrderStatus.pending,
            userId: userId,
            description,
            reagents: basket.map((reagent) => ({
                id: reagent.id,
                name: reagent.name,
                structure: reagent.structure,
                quantity: reagent.quantity,
                unit: reagent.unit,
                cas: reagent.cas,
                producer: reagent.producer,
                catalogId: reagent.catalogId,
                catalogLink: reagent.catalogLink,
                pricePerUnit: reagent.pricePerUnit,
                amount: reagent.amount,
            })),
        };

        setOrderData(orderData);
        try {
            const response = await submitOrderFx();
            if (response.id) {
                /* setSnackbar({
                    open: true,
                    message: "Order created successfully!",
                    severity: "success",
                }); */
                toast.success("Order created successfully!");
                clearBasket();
                setErrors({});
                setTimeout(() => navigate({ to: "/orders" }), 1000);
            } else {
                toast.error("Order creation failed!");
            }
        } catch (error) {
            const errorMessage = (error as Error)?.message || "Something went wrong";
            toast.error(errorMessage);
        }
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
                    error={!!errors.title}
                    helperText={errors.title}
                    sx={{ mt: 2 }}
                />
                <TextField
                    label="Seller"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                    variant="outlined"
                    fullWidth
                    error={!!errors.seller}
                    helperText={errors.seller}
                    sx={{ mt: 2 }}
                />
            </Box>
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                fullWidth
                error={!!errors.description}
                helperText={errors.description}
                sx={{ mt: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleCreateOrder} sx={{ mt: 2 }}>
                Create Order
            </Button>
        </Box>
    );
}
