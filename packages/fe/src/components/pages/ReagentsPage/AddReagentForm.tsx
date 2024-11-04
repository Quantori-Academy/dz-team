import { forwardRef, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import { CreateReagentType } from "api/reagents";
import { base } from "api/request";
import { addReagentEvent } from "stores/reagents";

interface AddReagentFormProps {
    onClose: () => void;
}
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

export const AddReagentForm = forwardRef<HTMLDivElement, AddReagentFormProps>(
    ({ onClose }, ref) => {
        const [formData, setFormData] = useState<CreateReagentType>({
            name: "",
            description: "",
            structure: "",
            cas: "",
            producer: "",
            catalogId: "",
            catalogLink: "",
            pricePerUnit: 0,
            unit: "",
            quantity: 0,
            expirationDate: new Date().toISOString().split("T")[0],
            storageLocation: "",
        });

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: name === "quantity" || name === "pricePerUnit" ? Number(value) : value,
            });
        };

        const handleSubmit = async () => {
            try {
                const response = await fetch(`${base}/api/v1/reagents`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });
                const newReagent = await response.json();

                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                addReagentEvent(newReagent);
                alert("Reagent added successfully!");
                onClose();
            } catch {
                alert("Failed to add reagent. Please try again.");
            }
        };

        // Check if all fields are filled
        const isFormValid = Object.values(formData).every((value) => value !== "" && value !== 0);

        return (
            <Box
                ref={ref}
                tabIndex={-1}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    width: 400,
                    mx: "auto",
                    mt: 4,
                    maxHeight: "90vh",
                    overflowY: "auto",
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Add New Reagent
                </Typography>
                {fields.map((field, index) => (
                    <TextField
                        key={index}
                        label={field.label}
                        name={field.name}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        type={field.type || "text"}
                        required
                    />
                ))}
                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                >
                    Submit
                </Button>
                <Button variant="outlined" sx={{ mt: 1 }} onClick={onClose}>
                    Cancel
                </Button>
            </Box>
        );
    },
);

AddReagentForm.displayName = "AddReagentForm";
