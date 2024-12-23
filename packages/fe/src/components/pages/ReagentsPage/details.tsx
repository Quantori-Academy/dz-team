import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useLoaderData, useNavigate } from "@tanstack/react-router";

import { DetailsEditPage } from "components/DetailsEditPage/DetailsEditPage";
import { Reagent } from "shared/generated/zod";
import { deleteReagentAction, updateReagentAction } from "utils/reagentActions";

const fields = [
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

export function ReagentDetailsPage() {
    const [_isEditing, setIsEditing] = useState(false);
    const reagent = useLoaderData({ from: "/_app/_researcherLayout/reagents/$id" });
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

    const handleAction = async (actionType: "submit" | "delete", data?: Reagent) => {
        if (actionType === "delete") {
            await deleteReagentAction(reagent.id, navigate);
        } else if (actionType === "submit" && data) {
            setIsEditing(false);
            await updateReagentAction(data, navigate);
        }
    };

    return (
        <DetailsEditPage
            baseUrl="/reagents"
            url="/_app/_researcherLayout/reagents/$id"
            fields={fields}
            onAction={handleAction}
            editableFields={["quantity", "storageLocation"]}
        />
    );
}
