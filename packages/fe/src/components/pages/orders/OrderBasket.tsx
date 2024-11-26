import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Drawer, IconButton, TextField, Typography } from "@mui/material";
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
    handleDeleteFromBasket: (id: string) => void;
    handleClearBasket: () => void;
    errorMessage: string;
    open: boolean;
    onClose: () => void;
};
export function OrderBasket({
    basket,
    title,
    seller,
    description,
    setTitle,
    setSeller,
    setDescription,
    handleDeleteFromBasket,
    handleClearBasket,
    errorMessage,
    open,
    onClose,
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
        onClose();
        handleClearBasket();
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 600, p: 3 }}>
                <Typography variant="h6">Basket</Typography>
                {basket.length === 0 ? (
                    <Typography>Your basket is empty</Typography>
                ) : (
                    <>
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
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            variant="outlined"
                            fullWidth
                            required
                            sx={{ mt: 2 }}
                        />
                        {basket.map(({ reagent }) => (
                            <Box
                                key={reagent.id}
                                sx={{ display: "flex", alignItems: "center", mt: 2 }}
                            >
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{ mb: 1, textAlign: "center" }}
                                    >
                                        Name
                                    </Typography>
                                    <Typography>{reagent.name}</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography variant="caption" sx={{ textAlign: "center" }}>
                                        Amount
                                    </Typography>
                                    <Typography sx={{ mt: 1, textAlign: "center" }}>
                                        {reagent.amount}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{ mb: 1, textAlign: "center" }}
                                    >
                                        Unit
                                    </Typography>
                                    <Typography>{reagent.units}</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        sx={{ mb: 1, textAlign: "center" }}
                                    >
                                        Price
                                    </Typography>
                                    <Typography sx={{ mx: 1 }}>
                                        ${(reagent.pricePerUnit ?? 0).toFixed(2)}
                                    </Typography>
                                </Box>
                                <IconButton onClick={() => handleDeleteFromBasket(reagent.id)}>
                                    <DeleteIcon />
                                </IconButton>
                                {errorMessage && (
                                    <Typography color="error" variant="caption">
                                        {errorMessage}
                                    </Typography>
                                )}
                            </Box>
                        ))}
                        <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
                            Total Price: $
                            {basket
                                .reduce(
                                    (total, { reagent, quantity }) =>
                                        total + (reagent.pricePerUnit ?? 0) * quantity,
                                    0,
                                )
                                .toFixed(2)}
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleClearBasket}
                            sx={{ mt: 2, mr: 3 }}
                        >
                            Clear All
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCreateOrder}
                            sx={{ mt: 2 }}
                        >
                            Create Order
                        </Button>
                    </>
                )}
            </Box>
        </Drawer>
    );
}
