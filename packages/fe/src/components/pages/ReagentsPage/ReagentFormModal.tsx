import { Box, TextField } from "@mui/material";

import { CreateReagentType } from "api/reagents";
import { Modal } from "components/modal/Modal";

type ReagentFormModalProps = {
    isOpen: boolean;
    formData: CreateReagentType;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: () => void;
    handleModalClose: () => void;
};

const fields = [
    { label: "Name", name: "name" },
    { label: "Description", name: "description" },
    { label: "Structure", name: "structure" },
    { label: "CAS Number", name: "cas" },
    { label: "Producer", name: "producer" },
    { label: "Catalog ID", name: "catalogId" },
    { label: "Catalog Link", name: "catalogLink" },
    { label: "Price per Unit", name: "pricePerUnit", type: "number" },
    { label: "Unit", name: "unit" },
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
                    {fields.map((field, index) => (
                        <TextField
                            key={index}
                            label={field.label}
                            name={field.name}
                            value={formData[field.name as keyof typeof formData] || ""}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            type={field.type || "text"}
                            required
                        />
                    ))}
                </Box>
            }
            title="Add New Reagent"
            labels={[{ ok: "Submit" }, { cancel: "Cancel" }]}
            resolve={handleSubmit}
            reject={handleModalClose}
        />
    );
};
