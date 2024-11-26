import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { CreateOrderReagent } from "api/orderDetails/contract";

type OrderReagentFormModalProps = {
    onSubmit: (reagent: CreateOrderReagent) => void;
    onCancel: () => void;
    onAddToOrder: (newReagent: CreateOrderReagent) => void;
};
const fields = [
    { name: "name", label: "Name", width: 150 },
    { name: "structure", label: "Structure", width: 170 },
    { name: "cas", label: "Cas", width: 170 },
    { name: "producer", label: "Producer", width: 170 },
    { name: "catalogId", label: "Catalog Id", width: 150 },
    { name: "catalogLink", label: "Catalog Link", width: 170 },
    { name: "units", label: "Units ", width: 170 },
    { name: "pricePerUnit", label: "Price Per Unit", width: 170, type: "number" },
    { name: "quantity", label: "Quantity", width: 170, type: "number" },
    { name: "amount", label: "Amount", width: 170, type: "number" },
];

export const OrderReagentFormModal = ({
    onSubmit,
    onCancel,
    onAddToOrder,
}: OrderReagentFormModalProps) => {
    const [formData, setFormData] = useState({
        name: "",
        structure: "",
        cas: "",
        producer: "",
        catalogId: "",
        catalogLink: "",
        pricePerUnit: 0,
        units: "ml",
        quantity: 0,
        amount: 1,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        try {
            const parsedData: CreateOrderReagent = {
                ...formData,
                name: formData.name || "",
                quantity: Number(formData.quantity),
                pricePerUnit: Number(formData.pricePerUnit),
                amount: Number(formData.amount),
                id: uuidv4(),
            };
            onSubmit(parsedData);
            onAddToOrder(parsedData);
        } catch (error) {
            if (error instanceof z.ZodError) {
                alert("Validation errors");
            } else {
                alert("An unexpected error occurred");
            }
        }
    };

    return (
        <Box>
            {fields.map((field) => (
                <TextField
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type={field.type || "text"}
                />
            ))}
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <Button variant="contained" onClick={handleSubmit}>
                    Submit
                </Button>
                <Button variant="outlined" onClick={onCancel}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};
