import { BaseTextFieldProps, Grid2 as Grid, TextField } from "@mui/material";
import { useUnit } from "effector-react";

import { $formData, setFormData } from "stores/reagents";

const fields: BaseTextFieldProps[] = [
    { label: "Name", name: "name" },
    { label: "Description", name: "description" },
    { label: "Category", name: "category", helperText: "Available options: reagent, sample" },
    { label: "Structure", name: "structure" },
    { label: "CAS Number", name: "cas" },
    { label: "Producer", name: "producer" },
    { label: "Catalog ID", name: "catalogId" },
    { label: "Catalog Link", name: "catalogLink" },
    { label: "Price per Unit", name: "pricePerUnit", type: "number" },
    {
        label: "Currency",
        name: "currency",
        helperText: "Available options: usd, euro, rub, cny, jpy",
    },
    { label: "Unit", name: "unit", helperText: "Available options: ml, l, mg, g, oz, lb." },
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
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {fields.map((field) => {
                return (
                    <Grid size={6} key={field.name}>
                        <TextField
                            label={field.label}
                            name={field.name}
                            value={formData[field.name as keyof typeof formData] || ""}
                            onChange={handleChange}
                            type={field.type || "text"}
                            helperText={field.helperText}
                            required
                            sx={{ width: 1, py: 1 }}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};
