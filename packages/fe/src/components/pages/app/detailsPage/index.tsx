import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useLoaderData, useNavigate } from "@tanstack/react-router";

import { ReagentDetails } from "api/reagentDetails/contract";
import { DetailsEditPage } from "components/DetailForm/DetailForm";
import { deleteReagent, updateReagent } from "utils/reagentActions";

export function ReagentDetailsPage() {
    const [_isEditing, setIsEditing] = useState(false);
    const reagent = useLoaderData({ from: "/_app/reagents/$id" });
    const navigate = useNavigate();

    if (!reagent) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Typography variant="h6">Reagent not found.</Typography>
            </Box>
        );
    }

    const fields = [
        { label: "ID", name: "id", disabled: true },
        { label: "Name", name: "name" },
        { label: "Category", name: "category" },
        { label: "Description", name: "description" },
        { label: "CAS Number", name: "cas" },
        { label: "Producer", name: "producer" },
        { label: "Catalog ID", name: "catalogId" },
        { label: "Catalog Link", name: "catalogLink" },
        { label: "Price per Unit", name: "pricePerUnit", type: "number" },
        { label: "Quantity", name: "quantity", type: "number" },
        { label: "Units", name: "unit" },
        { label: "Storage Location", name: "storageLocation" },
    ];

    const handleAction = async (actionType: "submit" | "delete", data?: ReagentDetails) => {
        if (actionType === "delete") {
            deleteReagent(reagent.id, navigate);
        } else if (actionType === "submit" && data) {
            setIsEditing(false);
            await updateReagent(data, navigate);
        }
    };

    return (
        <DetailsEditPage
            baseUrl="/reagents"
            url="/_app/reagents/$id"
            fields={fields}
            onAction={handleAction}
            editableFields={["quantity", "storageLocation"]}
        />
    );
}
