import { useState } from "react";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import { CreateOrderReagent } from "api/order/contract";
import { UnitSchema } from "shared/generated/zod";
import { validateInput } from "utils/validationInput";

const unitOptions = UnitSchema.options;

// with discriminated union for onDelete or no onDelete - with onDelete and selectedReagent it's Edit mode
type OrderReagentFormModalProps = {
    onSubmit: (reagent: CreateOrderReagent) => void;
    onCancel: () => void;
} & (
    | {
          selectedReagent: CreateOrderReagent;
          onDelete: () => void;
      }
    | {
          selectedReagent?: never;
          onDelete?: never;
      }
);

const initialFormData = {
    name: "",
    structure: "",
    cas: "",
    producer: "",
    catalogId: "",
    catalogLink: "",
    pricePerUnit: 0,
    unit: "ml",
    quantity: 0,
    amount: 1,
};

const fields = [
    { name: "name", label: "Name", width: 150 },
    { name: "structure", label: "Structure", width: 170 },
    { name: "cas", label: "Cas", width: 170 },
    { name: "producer", label: "Producer", width: 170 },
    { name: "catalogId", label: "Catalog Id", width: 150 },
    { name: "catalogLink", label: "Catalog Link", width: 170 },
    { name: "unit", label: "Unit ", width: 170 },
    { name: "pricePerUnit", label: "Price Per Unit", width: 170, type: "number" },
    { name: "quantity", label: "Quantity", width: 170, type: "number" },
    { name: "amount", label: "Amount", width: 170, type: "number" },
];

const validationRules = {
    name: { required: true },
    structure: { required: false },
    cas: { required: false },
    producer: { required: true },
    catalogId: { required: false },
    catalogLink: { required: false, urlCheck: true },
    unit: { required: true },
    pricePerUnit: { required: true, positiveCheck: true },
    quantity: { required: true, positiveCheck: true, integerCheck: true },
    amount: { required: true, positiveCheck: true, integerCheck: true },
};

export const OrderReagentFormModal = ({
    onSubmit,
    onCancel,
    selectedReagent,
    onDelete,
}: OrderReagentFormModalProps) => {
    const [formData, setFormData] = useState(selectedReagent || initialFormData);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof CreateOrderReagent, string>>>({});

    const validateForm = (): boolean => {
        const validationErrors = validateInput(formData, validationRules);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return false;
        }
        return true;
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const isEditModal = selectedReagent && !!onDelete;
    const isEditingDisabled = isEditModal && !isEditing;

    const handleAction = () => {
        if (!validateForm()) return;
        const id = isEditModal ? selectedReagent?.id : uuidv4();
        onSubmit({
            ...formData,
            pricePerUnit: Number(formData.pricePerUnit),
            quantity: Number(formData.quantity),
            amount: Number(formData.amount),
            id,
        });
    };

    return (
        <>
            {fields.map((field) => {
                const fieldError = errors[field.name as keyof typeof errors];

                return field.name === "unit" ? (
                    <Autocomplete
                        key={field.name}
                        options={unitOptions}
                        value={formData.unit}
                        onChange={(_event, newValue) => {
                            setFormData((prev) => ({ ...prev, unit: newValue || "" }));
                            setErrors((prev) => ({ ...prev, unit: undefined }));
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={field.label}
                                fullWidth
                                margin="normal"
                                error={!!fieldError}
                                helperText={fieldError}
                                disabled={isEditingDisabled}
                            />
                        )}
                    />
                ) : (
                    <TextField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        type={field.type || "text"}
                        disabled={isEditingDisabled}
                        error={!!fieldError}
                        helperText={fieldError}
                    />
                );
            })}
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <Button
                    variant="contained"
                    onClick={isEditingDisabled ? () => setIsEditing(true) : handleAction}
                >
                    {isEditingDisabled ? "Edit" : "Submit"}
                </Button>

                {isEditingDisabled && (
                    <Button variant="contained" color="error" onClick={onDelete}>
                        Delete
                    </Button>
                )}

                <Button
                    variant="outlined"
                    onClick={!isEditing ? onCancel : () => setIsEditing(false)}
                >
                    Cancel
                </Button>
            </Box>
        </>
    );
};
