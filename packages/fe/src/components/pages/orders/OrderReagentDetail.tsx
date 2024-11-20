import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import { useNavigate, useParams } from "@tanstack/react-router";

import { OrderReagentType } from "api/reagents";

import { mockData } from "./mockData";

export function OrderReagentDetail() {
    const { id } = useParams({ from: "/_app/_pOfficerLayout/create-order/$id" });
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [selectedReagent, setSelectedReagent] = useState<OrderReagentType | null>(null);
    const navigate = useNavigate();

    // Uncommented for now. It will be used for Detail/Edit page component
    // const fields = [
    //     { label: "Name", name: "name", disabled: true },
    //     { label: "Structure", name: "structure" },
    //     { label: "CAS ", name: "cas" },
    //     { label: "Producer ", name: "producer" },
    //     { label: "Catalog link ", name: "catalogLink" },
    //     { label: "Quantity", name: "quantity" },
    //     { label: "Unit", name: "unit" },
    //     { label: "Price per unit", name: "pricePerUnit" },
    //     { label: "Amount", name: "amount" },
    // ];
    useEffect(() => {
        if (id) {
            const reagent = mockData.find((reagent) => reagent.id === id);
            setSelectedReagent(reagent || null);
        }
    }, [id]);

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        navigate({ to: "/create-order", replace: false });
    };
    // TODO: Instead of Drawer will be added Detail/Edit Page component
    return (
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
                        <Typography>Structure: {selectedReagent.structure}</Typography>
                        <Typography>CAS: {selectedReagent.cas}</Typography>
                        <Typography>Producer: {selectedReagent.producer}</Typography>
                        <Typography>Catalog Link: {selectedReagent.catalogLink}</Typography>
                        <Typography>Quantity: {selectedReagent.quantity}</Typography>
                        <Typography>Price per Unit: {selectedReagent.pricePerUnit}</Typography>
                        <Typography>Amount: {selectedReagent.amount}</Typography>

                        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
                            Add to Order
                        </Button>
                    </>
                )}
            </Box>
        </Drawer>
    );
}
