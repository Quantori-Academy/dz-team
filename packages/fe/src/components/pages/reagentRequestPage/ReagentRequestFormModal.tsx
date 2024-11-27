import { BaseTextFieldProps, Grid2 as Grid, TextField } from "@mui/material";

import { CreateReagentRequestType } from "api/reagentRequest";

type ReagentRequestFormModalProps = {
    formData: CreateReagentRequestType;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const fields: BaseTextFieldProps[] = [
    { label: "Reagent Name", name: "name", required: true },
    { label: "Structure", name: "structure" },
    { label: "CAS Number", name: "cas" },
    { label: "Desired Quantity", name: "quantity", type: "number", required: true },
    { label: "User Comments", name: "commentsUser", type: "array" },
    { label: "Procurement Comments", name: "commentsProcurement", type: "array", disabled: true },
    { label: "Status", name: "status", disabled: true, defaultValue: "Pending" },
];

export const ReagentRequestFormModal = ({
    formData,
    handleChange,
}: ReagentRequestFormModalProps) => {
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {fields.map((field) => {
                return (
                    <Grid size={6} key={field.name}>
                        <TextField
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            value={formData[field.name as keyof typeof formData] || ""}
                            onChange={handleChange}
                            type={field.type || "text"}
                            helperText={field.helperText}
                            required={field.required}
                            disabled={field.disabled}
                            sx={{ width: 1, py: 1 }}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};
