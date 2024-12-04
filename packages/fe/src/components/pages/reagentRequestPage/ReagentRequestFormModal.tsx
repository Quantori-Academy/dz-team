import { BaseTextFieldProps, Grid2 as Grid, TextField } from "@mui/material";
import { useUnit } from "effector-react";

import { $formData, $formDataErrors, setFormData } from "stores/reagentRequest";

const fields: BaseTextFieldProps[] = [
    { label: "Reagent Name", name: "name", required: true },
    { label: "Structure", name: "structure" },
    { label: "CAS Number", name: "cas" },
    { label: "Desired Quantity", name: "quantity", type: "number", required: true },
    { label: "User Comments", name: "commentsUser", type: "array" },
    { label: "Procurement Comments", name: "commentsProcurement", type: "array", disabled: true },
    { label: "Status", name: "status", disabled: true },
];

export const ReagentRequestFormModal = () => {
    const [formData, formDataErrors] = useUnit([$formData, $formDataErrors]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "quantity" || name === "pricePerUnit" ? Number(value) : value,
        });
    };

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {fields.map(({ name, label, type, helperText, required, disabled, ...rest }, index) => {
                const errorText = formDataErrors[name as keyof typeof formDataErrors];
                return (
                    <Grid size={6} key={name}>
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
                            required={required}
                            disabled={disabled}
                            sx={{ width: 1 }}
                            {...rest}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};
