import { useEffect, useState } from "react";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import { CreateOrderReagent } from "api/orderDetails/contract";
import { UnitSchema } from "shared/generated/zod";
import { validateInput } from "utils/validationInput";

type Mode = "create" | "edit" | "view";
const unitOptions = UnitSchema.options;

type OrderReagentFormModalProps = {
    mode: Mode;
    selectedReagent?: CreateOrderReagent | null;
    onSubmit: (reagent: CreateOrderReagent) => void;
    onCancel: () => void;
    onDelete?: () => void;
};
const fields = [
    { name: "name", label: "Name", width: 150 },
    { name: "structure", label: "Structure", width: 170 },
    { name: "cas", label: "Cas", width: 170 },
    { name: "producer", label: "Producer", width: 170 },
    { name: "catalogId", label: "Catalog Id", width: 150 },
    { name: "catalogLink", label: "Catalog Link", width: 170 },
    { name: "units", label: "Units ", width: 170 },
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
    units: { required: true },
    pricePerUnit: { required: true, negativeCheck: true },
    quantity: { required: true, negativeCheck: true, integerCheck: true },
    amount: { required: true, negativeCheck: true, integerCheck: true },
};

export const OrderReagentFormModal = ({
    onSubmit,
    onCancel,
    mode,
    selectedReagent,
    onDelete,
}: OrderReagentFormModalProps) => {
    const [formData, setFormData] = useState({
        name: "",
        structure: "",
        cas: "",
        producer: "",
        catalogId: "",
        catalogLink: "",
        pricePerUnit: 0,
        units: "ml",
        quantity: 0,
        amount: 1,
    });
    const [currentMode, setCurrentMode] = useState<Mode>(mode);
    const [errors, setErrors] = useState<Partial<Record<keyof CreateOrderReagent, string>>>({});

    useEffect(() => {
        if (currentMode !== "create" && selectedReagent) {
            setFormData({
                ...selectedReagent,
                catalogLink: selectedReagent.catalogLink || "",
            });
        }
    }, [currentMode, selectedReagent]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = () => {
        const validationErrors = validateInput(formData, validationRules);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const parsedData: CreateOrderReagent = {
            ...formData,
            name: formData.name || "",
            quantity: Number(formData.quantity),
            pricePerUnit: Number(formData.pricePerUnit),
            amount: Number(formData.amount),
            id: selectedReagent?.id || uuidv4(),
        };
        onSubmit(parsedData);
    };

    return (
        <Box>
            {fields.map((field) =>
                field.name === "units" ? (
                    <Autocomplete
                        key={field.name}
                        options={unitOptions}
                        value={formData.units}
                        onChange={(_event, newValue) => {
                            setFormData((prev) => ({ ...prev, units: newValue || "" }));
                            setErrors((prev) => ({ ...prev, units: undefined }));
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={field.label}
                                fullWidth
                                margin="normal"
                                error={!!errors[field.name as keyof typeof errors]}
                                helperText={errors[field.name as keyof typeof errors]}
                                disabled={currentMode === "view"}
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
                        disabled={currentMode === "view"}
                        error={!!errors[field.name as keyof typeof errors]}
                        helperText={errors[field.name as keyof typeof errors]}
                    />
                ),
            )}
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                {currentMode === "create" && (
                    <Button variant="contained" onClick={handleSubmit}>
                        Create
                    </Button>
                )}
                {currentMode === "edit" && (
                    <>
                        <Button variant="contained" onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button variant="outlined" onClick={onCancel}>
                            Cancel
                        </Button>
                    </>
                )}
                {currentMode === "view" && (
                    <>
                        <Button variant="outlined" onClick={() => setCurrentMode("edit")}>
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={onDelete}
                            sx={{ marginLeft: "10px" }}
                        >
                            Delete
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
};