import { forwardRef, useEffect, useState } from "react";
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import { useUnit } from "effector-react";

import { ReagentType } from "api/reagents";
import { base } from "api/request";
import { $ReagentsList, fetchReagentsFx } from "stores/reagents";

import { Table } from "../Table/Table";

interface AddOrderFormProps {
    onClose: () => void;
}

const headerReagents = [
    { key: "name", label: "Name" },
    { key: "structure", label: "Structure" },
    { key: "structure", label: "Rendered Structure" },
    { key: "cas", label: "CAS" },
    { key: "producer", label: "Producer" },
    { key: "catalogId", label: "Catalog ID" },
    { key: "catalogLink", label: "Catalog Link" },
    { key: "unit", label: "Unit" },
    { key: "pricePerUnit", label: "Price Per Unit" },
    { key: "quantity", label: "Quantity" },
];
export const AddOrderForm = forwardRef<HTMLDivElement, AddOrderFormProps>(({ onClose }, ref) => {
    const [formData, setFormData] = useState({
        userId: "",
        reagents: "",
    });
    const [reagents, setReagents] = useState<ReagentType[]>([]);
    const [selectedReagent, setSelectedReagent] = useState<ReagentType | null>(null);
    const [showTable, setShowTable] = useState(false);
    const reagentsListOptions = useUnit($ReagentsList);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddReagent = () => {
        if (selectedReagent && !reagents.find((r) => r.id === selectedReagent.id)) {
            setReagents([...reagents, selectedReagent]);
            setSelectedReagent(null);
            setShowTable(true);
        }
    };

    const handleSubmit = async () => {
        const orderData = {
            userId: formData.userId,
            reagents: reagents.map((reagent) => ({
                id: reagent.id,
                name: reagent.name,
                structure: reagent.structure,
                cas: reagent.cas,
                producer: reagent.producer,
                catalogID: reagent.catalogId,
                catalogLink: reagent.catalogLink,
                units: reagent.unit,
                pricePerUnit: reagent.pricePerUnit,
                quantity: reagent.quantity,
            })),
        };

        try {
            const response = await fetch(`${base}/api/v1/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            alert("Order added successfully!");
            onClose();
        } catch {
            alert("Failed to add order. Please try again.");
        }
    };

    useEffect(() => {
        fetchReagentsFx();
    }, []);

    return (
        <Box
            ref={ref}
            tabIndex={-1}
            sx={{
                display: "flex",
                flexDirection: "column",
                p: 3,
                bgcolor: "background.paper",
                borderRadius: 2,
                width: 400,
                mx: "auto",
                mt: 4,
                maxHeight: "90vh",
                overflowY: "auto",
            }}
        >
            <Typography variant="h6" gutterBottom>
                Add New Order
            </Typography>
            <TextField
                label="User ID"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <Autocomplete
                options={reagentsListOptions}
                getOptionLabel={(option) => option.name ?? "Unnamed Reagent"}
                value={selectedReagent}
                onChange={(event, newValue) => setSelectedReagent(newValue)}
                renderInput={(params) => (
                    <TextField {...params} label="Choose Reagent" margin="normal" />
                )}
            />
            <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={handleAddReagent}
                disabled={!selectedReagent}
            >
                Add Selected Reagent
            </Button>
            {showTable && <Table data={reagents} headers={headerReagents} />}
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
                Submit
            </Button>
            <Button variant="outlined" sx={{ mt: 1 }} onClick={onClose}>
                Cancel
            </Button>
        </Box>
    );
});

AddOrderForm.displayName = "AddOrderForm";
