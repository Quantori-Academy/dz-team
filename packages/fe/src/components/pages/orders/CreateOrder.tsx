import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
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
import { useGate, useUnit } from "effector-react";

import { ReagentType } from "api/reagents";
import { ReusableGrid } from "components/dataGrid/ReusableGrid";
import { $reagentsList, ReagentsGate } from "stores/reagents";

const headers = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "structure", headerName: "Structure", width: 150 },
    { field: "description", headerName: "Description", width: 170 },
    { field: "quantity", headerName: "Quantity Left", width: 170 },
    { field: "unit", headerName: "Unit", width: 170 },
    { field: "expirationDate", headerName: "Expiration Date", width: 150 },
    { field: "storageLocation", headerName: "Storage Location", width: 170 },
    { field: "cas", headerName: "CAS ", width: 170 },
    { field: "producer", headerName: "Producer", width: 170 },
    { field: "catalogId", headerName: "Catalog ID", width: 170 },
    { field: "catalogLink", headerName: "Catalog Link ", width: 170 },
    { field: "pricePerUnit", headerName: "Price Per Unit", width: 170 },
];

const placeholder = "Search by seller, status";

const boxStyles = {
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
};

export const CreateOrder = () => {
    useGate(ReagentsGate);
    const reagents = useUnit($reagentsList);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedReagent, setSelectedReagent] = useState<ReagentType | null>(null);
    const [basketDrawerOpen, setBasketDrawerOpen] = useState(false);
    const [basket, setBasket] = useState<{ reagent: ReagentType; quantity: number }[]>([]);
    const [title, setTitle] = useState("");
    const [seller, setSeller] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleRowClick = (reagent: ReagentType) => {
        setSelectedReagent(reagent);
        setIsDrawerOpen(true);
    };

    const handleAddToOrder = () => {
        if (selectedReagent) {
            setBasket((prevBasket) => {
                const existingItem = prevBasket.find(
                    (item) => item.reagent.id === selectedReagent.id
                );
                if (existingItem) {
                    return prevBasket.map((item) =>
                        item.reagent.id === selectedReagent.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                }
                return [...prevBasket, { reagent: selectedReagent, quantity: 1 }];
            });
            setIsDrawerOpen(false);
            setTitle("");
            setSeller("");
        }
    };
    const toggleBasketDrawer = () => setBasketDrawerOpen(!basketDrawerOpen);

    const handleQuantityChange = (id: string, change: number) => {
        setBasket((prevBasket) => {
            return prevBasket.map((item) => {
                if (item.reagent.id === id) {
                    const newQuantity = item.quantity + change;
                    if (newQuantity > item.reagent.quantity) {
                        setErrorMessage(
                            `Cannot exceed available quantity of ${item.reagent.quantity}.`
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

    const sellerOptions = ["Seller A", "Seller B", "Seller C", "Seller D"];

    return (
        <Box sx={boxStyles}>
            <ReusableGrid
                rows={reagents}
                headers={headers}
                addRecordLabel="Create a new reagent"
                placeholder={placeholder}
                onRowClick={(row) => handleRowClick(row as ReagentType)}
                iconProps={{
                    badgeContent: basket.length,
                    color: "primary",
                    onClick: toggleBasketDrawer,
                }}
            />
            <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
                <Box sx={{ width: 400, p: 3 }}>
                    <IconButton
                        aria-label="close"
                        onClick={handleDrawerClose}
                        sx={{ position: "absolute", top: 8, right: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {selectedReagent && (
                        <>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Reagent Details
                            </Typography>
                            <Typography>ID: {selectedReagent.id}</Typography>
                            <Typography>Name: {selectedReagent.name}</Typography>
                            <Typography>Description: {selectedReagent.description}</Typography>

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddToOrder}
                                sx={{ mt: 3 }}
                            >
                                Add to Order
                            </Button>
                        </>
                    )}
                </Box>
            </Drawer>
            <Drawer anchor="right" open={basketDrawerOpen} onClose={toggleBasketDrawer}>
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
                                inputProps={{ maxLength: 200 }}
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
                                            Available Quantity
                                        </Typography>
                                        <Typography>{reagent.quantity}</Typography>
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
                                        <Typography>{reagent.unit}</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography
                                            variant="caption"
                                            sx={{ mb: 1, textAlign: "center" }}
                                        >
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
                                        0
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
        </Box>
    );
};
