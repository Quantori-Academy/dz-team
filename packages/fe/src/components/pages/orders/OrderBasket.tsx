import { useState } from "react";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useUnit } from "effector-react";

import { CreateOrderReagent } from "api/order/contract";
import { SnackbarAlert } from "components/snackBarAlert/snackBarAlert";
import { $auth } from "stores/auth";
import { OrderStatus, setOrderData, submitOrderFx } from "stores/order";
import { $sellers, fetchSellers } from "stores/sellers";
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
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: "success" | "error";
    }>({
        open: false,
        message: "",
        severity: "success",
    });
    const auth = useUnit($auth);
    const userId = auth && typeof auth !== "boolean" ? auth.userId : null;
    const sellers = useUnit($sellers);
    const navigate = useNavigate();

    const handleCreateOrder = async () => {
        const formData = { title, seller, description };
        const validationErrors = validateInput(formData, validationRules);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSnackbar({ open: true, message: "Order creation failed!", severity: "error" });
            return;
        }
        if (!userId) {
            setSnackbar({
                open: true,
                message: "Looks like your authorization is broken! Please re-login and try again",
                severity: "error",
            });
            return;
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
                setSnackbar({
                    open: true,
                    message: "Order created successfully!",
                    severity: "success",
                });
                clearBasket();
                setErrors({});
                setTimeout(() => navigate({ to: "/orders" }), 1000);
            } else {
                setSnackbar({
                    open: true,
                    message: "Order creation failed!",
                    severity: "error",
                });
            }
        } catch (error) {
            const errorMessage = (error as Error)?.message || "Something went wrong";
            setSnackbar({
                open: true,
                message: errorMessage,
                severity: "error",
            });
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
                    sx={{ flex: 1, mt: 2 }}
                />
                <Autocomplete
                    options={sellers}
                    getOptionLabel={(option) => (typeof option === "string" ? option : option.name)}
                    freeSolo
                    onOpen={() => {
                        if (!sellers.length) fetchSellers();
                    }}
                    onChange={(_, newValue) => {
                        if (typeof newValue === "string") {
                            setSeller(newValue);
                        } else if (newValue && typeof newValue === "object") {
                            setSeller(newValue.name);
                        }
                    }}
                    onInputChange={(_, newInputValue) => {
                        setSeller(newInputValue);
                    }}
                    noOptionsText={"No sellers to choose"}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Seller"
                            variant="outlined"
                            error={!!errors.seller}
                            helperText={errors.seller}
                            sx={{ mt: 2 }}
                        />
                    )}
                    sx={{ flex: 1 }}
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
            <SnackbarAlert
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            />
        </Box>
    );
}
