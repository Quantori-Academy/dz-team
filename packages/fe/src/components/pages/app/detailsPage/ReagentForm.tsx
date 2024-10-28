import { useRef } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

import { ReagentDetails } from "api/reagentDetails/contract";
import { deleteReagent, updateReagent } from "utils/reagentActions";

export type formData = Pick<
    ReagentDetails,
    "id" | "name" | "cas" | "producer" | "pricePerUnit" | "quantity" | "unit" | "storageLocation"
>;

type ReagentFormProps = {
    initialData: formData;
    onSubmit: () => void;
};

const fields = [
    { label: "Name", name: "name", disabled: true },
    { label: "CAS Number", name: "cas", disabled: true },
    { label: "Producer", name: "producer", disabled: true },
    { label: "Price per Unit ($)", name: "pricePerUnit", disabled: true },
    { label: "Quantity", name: "quantity", disabled: false },
    { label: "Unit", name: "unit", disabled: true },
    { label: "Storage Location", name: "storageLocation", disabled: false },
];

export const ReagentForm = ({ initialData, onSubmit }: ReagentFormProps) => {
    const quantityRef = useRef<HTMLInputElement>(null);
    const storageLocationRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
  
    const refMap = {
        quantity: quantityRef,
        storageLocation: storageLocationRef,
    };

    const handleSubmit = async () => {
        const updatedData: formData = {
            id: initialData.id,
            name: initialData.name,
            cas: initialData.cas,
            producer: initialData.producer,
            pricePerUnit: initialData.pricePerUnit,
            quantity: parseInt(quantityRef.current?.value || `${initialData.quantity}`, 10),
            unit: initialData.unit,
            storageLocation: storageLocationRef.current?.value || "",
        };
        if (updatedData.quantity === 0) {
            await deleteReagent(initialData.id, navigate);
        } else {
            await updateReagent(updatedData, navigate);
        }
        onSubmit();
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {fields.map((field, index) => {
                return (
                    <TextField
                        key={index}
                        label={field.label}
                        inputRef={refMap[field.name as keyof typeof refMap] || null}
                        defaultValue={initialData[field.name as keyof formData]}
                        disabled={field.disabled}
                    />
                );
            })}
            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    );
};
