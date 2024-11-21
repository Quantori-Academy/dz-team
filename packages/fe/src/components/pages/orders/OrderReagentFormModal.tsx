import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { OrderReagentsSchema } from "shared/zodSchemas/order/orderReagentSchema";

type OrderReagentFormModalProps = {
    onSubmit: (reagent: z.infer<typeof OrderReagentsSchema>) => void;
    onCancel: () => void;
};
const fields = [
    { name: "name", label: "Name", width: 150 },
    { name: "category", label: "Category", width: 170 },
    { name: "description", label: "Description", width: 170 },
    { name: "structure", label: "Structure", width: 170 },
    { name: "cas", label: "Cas", width: 170 },
    { name: "producer", label: "Producer", width: 170 },
    { name: "catalogId", label: "Catalog Id", width: 150 },
    // { name: "catalogLink", label: "Catalog Link", width: 170 },
    { name: "unit", label: "Units ", width: 170 },
    { name: "pricePerUnit", label: "Price Per Unit", width: 170, type: "number" },
    { name: "currency", label: "Currency", width: 170 },
    { name: "quantity", label: "Quantity", width: 170, type: "number" },
    { name: "amount", label: "Amount", width: 170, type: "number" },
];

export const OrderReagentFormModal = ({ onSubmit, onCancel }: OrderReagentFormModalProps) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "reagent",
        structure: "",
        cas: "",
        producer: "",
        catalogId: "",
        // catalogLink: "",
        pricePerUnit: "",
        currency: "usd",
        unit: "ml",
        quantity: "",
        amount: "",
        // expirationDate: "",
        // storageLocation: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        try {
            const parsedData = {
                ...formData,
                quantity: Number(formData.quantity),
                pricePerUnit: Number(formData.pricePerUnit),
                amount: Number(formData.amount),
                id: uuidv4(),
            };
            const validatedData = OrderReagentsSchema.parse(parsedData);
            onSubmit(validatedData);
        } catch (_error) {
            // if (error instanceof z.ZodError) {
            //   console.error("Validation errors:", error.errors);
            // } else {
            //   console.error("An unexpected error occurred:", error);
            // }
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
