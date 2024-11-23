import DeleteIcon from "@mui/icons-material/Delete";
import {
    Autocomplete,
    Box,
    Button,
    Drawer,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";

import { CreateOrderReagent } from "api/orderDetails/contract";

type BasketProps = {
    basket: { reagent: CreateOrderReagent; quantity: number }[];
    title: string;
    seller: string | null;
    setTitle: (title: string) => void;
    setSeller: (seller: string | null) => void;
    handleQuantityChange: (id: string, change: number) => void;
    handleDeleteFromBasket: (id: string) => void;
    handleClearBasket: () => void;
    errorMessage: string;
    sellerOptions: string[];
    open: boolean;
    onClose: () => void;
};
export function OrderBasket({
    basket,
    title,
    seller,
    setTitle,
    setSeller,
    handleQuantityChange,
    handleDeleteFromBasket,
    handleClearBasket,
    errorMessage,
    sellerOptions,
    open,
    onClose,
}: BasketProps) {
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
                        <Autocomplete
                            options={sellerOptions}
                            value={seller}
                            onChange={(_event, newValue) => setSeller(newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Seller"
                                    variant="outlined"
                                    sx={{ mt: 2 }}
                                />
                            )}
                        />
                        {basket.map(({ reagent, quantity }) => (
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
                                        Quantity
                                    </Typography>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Button
                                            onClick={() => handleQuantityChange(reagent.id, -1)}
                                        >
                                            -
                                        </Button>
                                        <Typography sx={{ mx: 1 }}>{quantity}</Typography>
                                        <Button
                                            onClick={() => handleQuantityChange(reagent.id, 1)}
                                            disabled={quantity >= reagent.quantity}
                                        >
                                            +
                                        </Button>
                                    </Box>
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
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                            Create Order
                        </Button>
                    </>
                )}
            </Box>
        </Drawer>
    );
}
