import { BaseTextFieldProps, Box, TextField } from "@mui/material";
import { useUnit } from "effector-react";

import { $formData, setFormData } from "stores/reagents";

const fields: BaseTextFieldProps[] = [
    { label: "Name", name: "name" },
    { label: "Description", name: "description" },
    { label: "Structure", name: "structure" },
    { label: "CAS Number", name: "cas" },
    { label: "Producer", name: "producer" },
    { label: "Catalog ID", name: "catalogId" },
    { label: "Catalog Link", name: "catalogLink" },
    { label: "Price per Unit", name: "pricePerUnit", type: "number" },
    { label: "Unit", name: "unit", helperText: "Please write of this: ml, l, mg, g, oz, lb." },
    { label: "Quantity", name: "quantity", type: "number" },
    { label: "Expiration Date", name: "expirationDate", type: "date" },
    { label: "Storage Location", name: "storageLocation" },
];

export const ReagentFormModal = () => {
    const formData = useUnit($formData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "quantity" || name === "pricePerUnit" ? Number(value) : value,
        });
    };

    return (
        <Box>
            {fields.map((field, index) => {
                return (
                    <TextField
                        key={index}
                        label={field.label}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData] || ""}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        type={field.type || "text"}
                        helperText={field.helperText}
                        required
                    />
                );
            })}
        </Box>
    );
};
