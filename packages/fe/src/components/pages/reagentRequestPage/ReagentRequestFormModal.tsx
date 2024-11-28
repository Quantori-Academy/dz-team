import { BaseTextFieldProps, Box, TextField } from "@mui/material";

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
        <Box>
            {fields.map((field) => {
                return (
                    <TextField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData] || ""}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        type={field.type || "text"}
                        helperText={field.helperText}
                        required={field.required}
                        disabled={field.disabled}
                    />
                );
            })}
        </Box>
    );
};
