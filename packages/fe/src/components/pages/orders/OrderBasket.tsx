import { useState } from "react";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useUnit } from "effector-react";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { CreateOrderReagent } from "api/orderDetails/contract";
import { $auth } from "stores/auth";
import { OrderStatus, setOrderData, submitOrder } from "stores/order";
import { $sellers, fetchSellers } from "stores/sellers";
import { SnackbarAlert } from "utils/snackBarAlert";
import { validateInput } from "utils/validationInput";

type BasketProps = {
    basket: { reagent: CreateOrderReagent }[];
    title: string;
    seller: string;
    description: string;
    setTitle: (title: string) => void;
    setSeller: (seller: string) => void;
    setDescription: (seller: string) => void;
    clearBasket: () => void;
};

type CustomJwtPayload = JwtPayload & {
    userId?: string;
};

const validationRules = {
    title: {
        required: false,
        maxLength: 200,
    },
    seller: {
        required: false,
        maxLength: 200,
    },
    description: {
        required: true,
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
    const submitOrderEvent = useUnit(submitOrder);
    const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    const sellers = useUnit($sellers);

    const auth = useUnit($auth);

    let userId = null;

    if (auth && auth.self) {
        const token = auth.token;
        const decodedToken = jwtDecode<CustomJwtPayload>(token);

        if (decodedToken?.userId) {
            userId = decodedToken.userId;
        } else {
            alert("User ID not found in the token");
        }
    }

    const handleCreateOrder = () => {
        const formData = { title, seller, description };
        const validationErrors = validateInput(formData, validationRules);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSnackbarMessage("Order creation failed!");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }
        const orderData = {
            title,
            seller: seller || "",
            status: OrderStatus.pending,
            userId: userId,
            description,
            reagents: basket.map(({ reagent }) => ({
                id: reagent.id,
                name: reagent.name,
                structure: reagent.structure,
                quantity: reagent.quantity,
                units: reagent.units,
                cas: reagent.cas,
                producer: reagent.producer,
                catalogId: reagent.catalogId,
                catalogLink: reagent.catalogLink,
                pricePerUnit: reagent.pricePerUnit,
                amount: reagent.amount,
            })),
        };

        setOrderData(orderData);
        submitOrderEvent();
        setSnackbarMessage("Order created successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        clearBasket();
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
                    error={!!errors.title}
                    helperText={errors.title}
                    // sx={{ mt: 2 }}
                    sx={{ flex: 1, mt: 2 }}
                />
                <Autocomplete
                    options={sellers}
                    // getOptionLabel={(option) => option.name}
                    getOptionLabel={(option) => (typeof option === "string" ? option : option.name)}
                    freeSolo
                    onOpen={() => {
                        if (!sellers.length) fetchSellers();
                    }}
                    // onChange={(event, newValue) => {
                    //     setSeller(newValue ? newValue.name : "");
                    // }}
                    onChange={(event, newValue) => {
                        if (typeof newValue === "string") {
                            setSeller(newValue);
                        } else if (newValue && typeof newValue === "object") {
                            setSeller(newValue.name);
                        }
                    }}
                    onInputChange={(event, newInputValue) => {
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
                {/* <TextField
                    label="Seller"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                    variant="outlined"
                    fullWidth
                    error={!!errors.seller}
                    helperText={errors.seller}
                    sx={{ mt: 2 }}
                /> */}
            </Box>
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                fullWidth
                required
                error={!!errors.description}
                helperText={errors.description}
                sx={{ mt: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleCreateOrder} sx={{ mt: 2 }}>
                Create Order
            </Button>
            <SnackbarAlert
                open={snackbarOpen}
                message={snackbarMessage}
                severity={snackbarSeverity}
                onClose={() => setSnackbarOpen(false)}
            />
        </Box>
    );
}
