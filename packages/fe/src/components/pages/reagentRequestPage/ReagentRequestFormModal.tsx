import {
    BaseTextFieldProps,
    FormControl,
    Grid2 as Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { useUnit } from "effector-react";

import {
    $formData,
    $formDataErrors,
    $shouldShowErrors,
    setFormData,
    touchField,
} from "stores/reagentRequest";

const fields: BaseTextFieldProps[] = [
    { label: "Reagent Name", name: "name", required: true },
    { label: "Structure (SMILES)", name: "structure" },
    { label: "CAS Number", name: "cas" },
    {
        label: "Desired Quantity",
        name: "quantity",
        type: "number",
    },
    { label: "Unit", name: "unit" },
    { label: "User Comments", name: "commentsUser", type: "array" },
    { label: "Procurement Comments", name: "commentsProcurement", type: "array", disabled: true },
    { label: "Status", name: "status", disabled: true },
];

const unitOptions = ["ml", "l", "mg", "g", "oz", "lb"];

export const ReagentRequestFormModal = () => {
    const [formData, formDataErrors, touch] = useUnit([$formData, $formDataErrors, touchField]);
    const shouldShowErrors = useUnit($shouldShowErrors);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "quantity" ? Number(value) : value,
        });
    };

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {fields.map(({ name, label, type, required, disabled, ...rest }) => {
                const errorText = formDataErrors[name as keyof typeof formDataErrors];
                const showError = shouldShowErrors[name as keyof typeof formDataErrors];

                return (
                    <Grid size={6} key={name}>
                        {name === "unit" ? (
                            <FormControl fullWidth sx={{ width: 1, mt: 2, mb: 1 }}>
                                <InputLabel id="unit-label">{label}</InputLabel>
                                <Select
                                    labelId="unit-label"
                                    label={label}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                >
                                    {unitOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ) : (
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
                                helperText={showError ? errorText : ""}
                                error={showError ? Boolean(errorText) : false}
                                required={required}
                                disabled={disabled}
                                sx={{ width: 1 }}
                                {...rest}
                            />
                        )}
                    </Grid>
                );
            })}
        </Grid>
    );
};
