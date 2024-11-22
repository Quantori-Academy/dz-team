import { BaseTextFieldProps, Box, TextField } from "@mui/material";
import { useUnit } from "effector-react";

import { $formData, $formDataErrors, setFormData } from "stores/reagents";

const fields: BaseTextFieldProps[] = [
    { label: "Name", name: "name" },
    { label: "Description", name: "description" },
    { label: "Category", name: "category", helperText: "Available options are: reagent, sample" },
    { label: "Structure", name: "structure" },
    { label: "CAS Number", name: "cas" },
    { label: "Producer", name: "producer" },
    { label: "Catalog ID", name: "catalogId" },
    { label: "Catalog Link", name: "catalogLink" },
    {
        label: "Price per Unit",
        name: "pricePerUnit",
        type: "number",
        helperText: "Value must be a positive number",
    },
    {
        label: "Currency",
        name: "currency",
        helperText: "Available options are: usd, euro, rub, cny, jpy",
    },
    { label: "Unit", name: "unit", helperText: "Available options are: ml, l, mg, g, oz, lb." },
    {
        label: "Quantity",
        name: "quantity",
        type: "number",
        helperText: "Value must be a positive number",
    },
    { label: "Expiration Date", name: "expirationDate", type: "date" },
    { label: "Storage Location", name: "storageLocation" },
];

export const ReagentFormModal = () => {
    const [formData, formDataErrors] = useUnit([$formData, $formDataErrors]);

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
                const errorText = formDataErrors[field.name as keyof typeof formDataErrors];
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
                        helperText={errorText || field.helperText}
                        error={Boolean(errorText)}
                        required
                    />
                );
            })}
        </Box>
    );
};
