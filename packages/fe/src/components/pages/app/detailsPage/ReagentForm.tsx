/* eslint-disable react/prop-types */

import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

interface ReagentFormProps {
    initialData: {
        name: string;
        casNumber: string;
        producer: string;
        pricePerUnit: string | number;
        quantity: string | number;
        units: string;
    };
    onSubmit: (formData: {
        name: string;
        casNumber: string;
        producer: string;
        pricePerUnit: string | number;
        quantity: string | number;
        units: string;
    }) => void;
}

export const ReagentForm: React.FC<ReagentFormProps> = ({ initialData, onSubmit }) => {
    const [formData, setFormData] = useState(
        initialData || {
            name: "",
            casNumber: "",
            producer: "",
            pricePerUnit: "",
            quantity: "",
            units: "",
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Name" name="name" value={formData.name} onChange={handleChange} />
            <TextField
                label="CAS Number"
                name="casNumber"
                value={formData.casNumber}
                onChange={handleChange}
            />
            <TextField
                label="Producer"
                name="producer"
                value={formData.producer}
                onChange={handleChange}
            />
            <TextField
                label="Price per Unit ($)"
                name="pricePerUnit"
                value={formData.pricePerUnit}
                onChange={handleChange}
            />
            <TextField
                label="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
            />
            <TextField label="Units" name="units" value={formData.units} onChange={handleChange} />

            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    );
};
