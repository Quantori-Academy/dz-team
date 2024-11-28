import { Box, TextField, TextFieldProps } from "@mui/material";
import { useUnit } from "effector-react";

import { $formData, $formDataErrors, setFormData } from "stores/reagents";

const fields: TextFieldProps[] = [
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
        slotProps: {
            htmlInput: {
                min: 1,
            },
        },
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
        slotProps: {
            htmlInput: {
                min: 1,
            },
        },
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
            {fields.map(({ name, label, type, helperText, ...rest }, index) => {
                const errorText = formDataErrors[name as keyof typeof formDataErrors];
                return (
                    <TextField
                        key={index}
                        label={label}
                        name={name}
                        value={formData[name as keyof typeof formData] || ""}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        type={type || "text"}
                        helperText={errorText || helperText}
                        error={Boolean(errorText)}
                        required
                        {...rest}
                    />
                );
            })}
        </Box>
    );
};
