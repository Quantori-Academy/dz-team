import { useRef } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

import { ReagentDetails } from "api/reagentDetails/contract";
import { base } from "api/request";
import { updateReagentEvent } from "stores/reagents";
import { deleteReagent } from "utils/reagentActions";

type formData = Pick<
    ReagentDetails,
    "id" | "name" | "cas" | "producer" | "pricePerUnit" | "quantity" | "unit" | "storageLocation"
>;

type ReagentFormProps = {
    initialData: formData;
    onSubmit: () => void;
};

export const ReagentForm = ({ initialData, onSubmit }: ReagentFormProps) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const casRef = useRef<HTMLInputElement>(null);
    const producerRef = useRef<HTMLInputElement>(null);
    const pricePerUnitRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);
    const unitRef = useRef<HTMLInputElement>(null);
    const storageLocationRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

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
        try {
            if (updatedData.quantity === 0) {
                await deleteReagent(initialData.id, navigate);
                onSubmit();
            } else {
                await fetch(`${base}/api/v1/reagents/${initialData.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedData),
                });
                updateReagentEvent(updatedData);
                onSubmit();
                navigate({ to: `/reagents/${initialData.id}` });
            }
        } catch (_error) {
            alert("Failed to update reagent. Please try again later.");
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Name" inputRef={nameRef} defaultValue={initialData.name} disabled />
            <TextField
                label="CAS Number"
                name="cas"
                inputRef={casRef}
                defaultValue={initialData.cas}
                disabled
            />
            <TextField
                label="Producer"
                name="producer"
                inputRef={producerRef}
                defaultValue={initialData.producer}
                disabled
            />
            <TextField
                label="Price per Unit ($)"
                name="pricePerUnit"
                inputRef={pricePerUnitRef}
                defaultValue={initialData.pricePerUnit}
                disabled
            />
            <TextField
                label="Quantity"
                name="quantity"
                inputRef={quantityRef}
                defaultValue={initialData.quantity}
            />
            <TextField label="Unit" inputRef={unitRef} defaultValue={initialData.unit} disabled />
            <TextField
                label="Storage Location"
                inputRef={storageLocationRef}
                defaultValue={initialData.storageLocation}
            />
            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    );
};
