import { useMemo, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

// TODO: use request and move to api folder
import { base } from "api/request";
import { ReagentSchema } from "shared/generated/zod";

const CreateReagentInputSchema = ReagentSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    type: true,
    currency: true,
    category: true,
});

const fields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Description", name: "description", type: "text" },
    { label: "Structure", name: "structure", type: "text" },
    { label: "CAS Number", name: "cas", type: "text" },
    { label: "Producer", name: "producer", type: "text" },
    { label: "Catalog ID", name: "catalogId", type: "text" },
    { label: "Catalog Link", name: "catalogLink", type: "text" },
    { label: "Price per Unit", name: "pricePerUnit", type: "number" },
    { label: "Unit", name: "unit", type: "text" },
    // TODO: add dropdown with all units or better yet change it to string in the schema
    { label: "Quantity", name: "quantity", type: "number" },
    { label: "Expiration Date", name: "expirationDate", type: "date" },
    { label: "Storage Location", name: "storageId", type: "text" },
    // TODO: add storage location selection (probably as a dropdown with all storage locations, searchable)
    // ! the user should not have to type the UUID manually
] as const;

const defaultValues = fields.reduce(
    (acc, field) => {
        acc[field.name] = "";
        if (field.name === "quantity" || field.name === "pricePerUnit") acc[field.name] = 0;
        if (field.name === "expirationDate")
            acc[field.name] = new Date().toISOString().split("T")[0];
        if (field.name === "unit") acc[field.name] = "ml";
        if (field.name === "storageId") acc[field.name] = "d4115bbe-e26a-41d2-984b-acfd7811c24e";
        return acc;
    },
    {} as Record<string, string | number>,
);

const isRequired = (fieldName: (typeof fields)[number]["name"]) => {
    if (fieldName === "storageId") return true;
    return CreateReagentInputSchema.shape[fieldName].isOptional() === false;
};

const handleSubmit = async (formData: Record<string, string | number>, onClose: () => void) => {
    // ! currently 400 Bad Request - body/storage Required - clear up with BE what data is required
    // random UUID is validated, but response is still 400
    // To me it looks like storage in the `ReagentCreateInputSchema` used in `ReagentService.createReagent` is an entity, not an ID

    // basically this form should have a single select dropdown with all storage locations
    // selected storage location should be sent as storageId
    // BE should make sure that storageId is a valid UUID and that it exists in the database before adding the reagent, just in case
    // if it's ok, BE should add the reagent and return 201 Created
    // FE redirects to the reagents list page, updated
    try {
        await fetch(`${base}/api/v1/reagents`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        onClose();
    } catch {
        alert("Failed to add reagent. Please try again.");
    }
};

export const AddReagentForm = ({ onClose }: { onClose: () => void }) => {
    const [formData, setFormData] = useState(defaultValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "quantity" || name === "pricePerUnit" ? Number(value) : value,
        });
    };

    // Check if all fields are filled
    const isFormValid = useMemo(() => {
        // TODO: this considers empty strings valid - they are not
        return CreateReagentInputSchema.safeParse(formData).success;
    }, [formData]);

    return (
        <Box tabIndex={-1}>
            <Box display="flex" flexWrap="wrap" gap="4px 12px">
                {fields.map((field, index) => (
                    <TextField
                        key={index}
                        label={field.label}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        margin="normal"
                        type={field.type ?? "text"}
                        required={isRequired(field.name)}
                        sx={{ flexGrow: 1 }}
                    />
                ))}
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => handleSubmit(formData, onClose)}
                    disabled={!isFormValid}
                >
                    Submit
                </Button>
                <Button variant="outlined" sx={{ mt: 1 }} onClick={onClose}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

AddReagentForm.displayName = "AddReagentForm";
