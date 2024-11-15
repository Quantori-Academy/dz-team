import { BaseTextFieldProps, Box, TextField } from "@mui/material";

import { CreateReagentType } from "api/reagents";
import { Modal } from "components/modal/Modal";

type ReagentFormModalProps = {
    isOpen: boolean;
    formData: CreateReagentType;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
    handleModalClose: () => void;
};

const fields: BaseTextFieldProps[] = [
    { label: "Name", name: "name" },
    { label: "Description", name: "description" },
    { label: "Category", name: "category", helperText: "Please write of this: reagent, sample" },
    { label: "Structure", name: "structure" },
    { label: "CAS Number", name: "cas" },
    { label: "Producer", name: "producer" },
    { label: "Catalog ID", name: "catalogId" },
    { label: "Catalog Link", name: "catalogLink" },
    { label: "Price per Unit", name: "pricePerUnit", type: "number" },
    {
        label: "Currency",
        name: "currency",
        helperText: "Please write of this: usd, euro, rub, cny, jpy",
    },
    { label: "Unit", name: "unit", helperText: "Please write of this: ml, l, mg, g, oz, lb." },
    { label: "Quantity", name: "quantity", type: "number" },
    { label: "Expiration Date", name: "expirationDate", type: "date" },
    { label: "Storage Location", name: "storageLocation" },
];

export const ReagentFormModal = ({
    isOpen,
    formData,
    handleChange,
    handleSubmit,
    handleModalClose,
}: ReagentFormModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            message={
                <Box>
                    {fields.map((field, index) => {
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
                                helperText={field.helperText}
                                required
                            />
                        );
                    })}
                </Box>
            }
            title="Add New Reagent"
            labels={[{ ok: "Submit" }, { cancel: "Cancel" }]}
            resolve={handleSubmit}
            reject={handleModalClose}
        />
    );
};
