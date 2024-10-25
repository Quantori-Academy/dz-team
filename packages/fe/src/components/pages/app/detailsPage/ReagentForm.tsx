import { useRef } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

import { ReagentDetails } from "api/reagentDetails/contract";
import { base } from "api/request";

type formData = Pick<
    ReagentDetails,
    "id" | "name" | "cas" | "producer" | "pricePerUnit" | "quantity" | "unit"
>;
type ReagentFormProps = {
    initialData: formData;
    // onSubmit: (formData: formData) => void;
    onSubmit: () => void;
};

export const ReagentForm = ({ initialData, onSubmit }: ReagentFormProps) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const casRef = useRef<HTMLInputElement>(null);
    const producerRef = useRef<HTMLInputElement>(null);
    const pricePerUnitRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);
    const unitRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const updatedData: formData = {
            id: initialData.id,
            name: nameRef.current?.value || initialData.name,
            cas: casRef.current?.value || initialData.cas,
            producer: producerRef.current?.value || initialData.producer,
            pricePerUnit: parseInt(
                pricePerUnitRef.current?.value || `${initialData.pricePerUnit}`,
                10,
            ),
            quantity: parseInt(quantityRef.current?.value || `${initialData.quantity}`, 10),
            unit: unitRef.current?.value || initialData.unit,
        };
        // onSubmit(formData);
        try {
            await fetch(`${base}/api/v1/reagents/${initialData.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
            onSubmit();
            navigate({ to: `${base}/api/v1/reagents/${initialData.id}` });
        } catch (_error) {
            alert("Failed to update reagent. Please try again later.");
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Name" inputRef={nameRef} defaultValue={initialData.name} />
            <TextField
                label="CAS Number"
                name="cas"
                inputRef={casRef}
                defaultValue={initialData.cas}
            />
            <TextField
                label="Producer"
                name="producer"
                inputRef={producerRef}
                defaultValue={initialData.producer}
            />
            <TextField
                label="Price per Unit ($)"
                name="pricePerUnit"
                inputRef={pricePerUnitRef}
                defaultValue={initialData.pricePerUnit}
            />
            <TextField
                label="Quantity"
                name="quantity"
                inputRef={quantityRef}
                defaultValue={initialData.quantity}
            />
            <TextField label="Unit" inputRef={unitRef} defaultValue={initialData.unit} />

            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    );
};
