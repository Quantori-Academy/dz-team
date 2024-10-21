import { useRef } from "react";
import { Box, Button, TextField } from "@mui/material";

import { Reagent } from "api/reagentType";

type formData = Pick<
    Reagent,
    "name" | "casNumber" | "producer" | "pricePerUnit" | "quantity" | "units"
>;
type ReagentFormProps = {
    initialData: formData;
    onSubmit: (formData: formData) => void;
};

export const ReagentForm = ({ initialData, onSubmit }: ReagentFormProps) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const casNumberRef = useRef<HTMLInputElement>(null);
    const producerRef = useRef<HTMLInputElement>(null);
    const pricePerUnitRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);
    const unitsRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        const formData: formData = {
            name: nameRef.current?.value || initialData.name,
            casNumber: casNumberRef.current?.value || initialData.casNumber,
            producer: producerRef.current?.value || initialData.producer,
            pricePerUnit: parseInt(
                pricePerUnitRef.current?.value || `${initialData.pricePerUnit}`,
                10,
            ),
            quantity: parseInt(quantityRef.current?.value || `${initialData.quantity}`, 10),
            units: unitsRef.current?.value || initialData.units,
        };
        onSubmit(formData);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Name" inputRef={nameRef} defaultValue={initialData.name} />
            <TextField
                label="CAS Number"
                name="casNumber"
                inputRef={casNumberRef}
                defaultValue={initialData.casNumber}
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
            <TextField label="Units" inputRef={unitsRef} defaultValue={initialData.units} />

            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    );
};
