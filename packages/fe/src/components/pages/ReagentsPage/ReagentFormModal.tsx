import { Grid2 as Grid, TextField, TextFieldProps } from "@mui/material";
import { useUnit } from "effector-react";

import {
    $formData,
    $formDataErrors,
    $shouldShowErrors,
    setFormData,
    touchField,
} from "stores/reagents";

const fields: TextFieldProps[] = [
    { label: "Name", name: "name" },
    { label: "Description", name: "description" },
    { label: "Category", name: "category", helperText: "Available options: reagent, sample" },
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
        helperText: "Available options: usd, euro, rub, cny, jpy",
    },
    { label: "Unit", name: "unit", helperText: "Available options: ml, l, mg, g, oz, lb." },
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
    const [formData, formDataErrors, touch] = useUnit([$formData, $formDataErrors, touchField]);
    const shouldShowErrors = useUnit($shouldShowErrors);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "quantity" || name === "pricePerUnit" ? Number(value) : value,
        });
    };

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {fields.map(({ name, label, type, helperText, ...rest }) => {
                const errorText = formDataErrors[name as keyof typeof formDataErrors];
                const showError = shouldShowErrors[name as keyof typeof formDataErrors];

                return (
                    <Grid size={6} key={name}>
                        <TextField
                            label={label}
                            name={name}
                            value={formData[name as keyof typeof formData] || ""}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            type={type || "text"}
                            onBlur={() => {
                                if (name) {
                                    touch(name);
                                }
                            }}
                            helperText={showError ? errorText || helperText : ""}
                            error={showError ? Boolean(errorText) : false}
                            required
                            sx={{ width: 1 }}
                            {...rest}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};
