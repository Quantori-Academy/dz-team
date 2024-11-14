import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useLoaderData, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { ReagentRequestDetails } from "api/reagentRequestDetails/contract";
import { base, request } from "api/request";
import { DetailsEditPage } from "components/DetailsEditPage/DetailsEditPage";

export function ReagentRequestDetailsPage({
    url,
}: {
    url:
        | "/_app/_pOfficerLayout/allReagentRequests/$id"
        | "/_app/_researcherLayout/reagentRequests/$id";
}) {
    const [, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const reagentRequest = useLoaderData({ from: url });

    if (!reagentRequest) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Typography variant="h6">Reagent request not found.</Typography>
            </Box>
        );
    }

    const fields = [
        { label: "ID", name: "id", disabled: true },
        { label: "User ID", name: "userId" },
        { label: "Reagent Name", name: "reagentName" },
        { label: "Structure", name: "structure" },
        { label: "CAS Number", name: "casNumber" },
        { label: "Desired Quantity", name: "desiredQuantity" },
        { label: "User Comments", name: "userComments" },
        { label: "Procurement Comments", name: "procurementComments" },
        { label: "Status", name: "status" },
        { label: "Creation Date", name: "creationDate", type: "date" },
        { label: "Date Modified", name: "dateModified", type: "date" },
    ];

    const handleAction = async (actionType: "submit" | "delete", data?: ReagentRequestDetails) => {
        if (actionType === "delete") {
            await request(`${base}/api/v1/reagent-request/${reagentRequest.id}`, z.void(), {
                method: "DELETE",
            });
            navigate({
                to:
                    url === "/_app/_pOfficerLayout/allReagentRequests/$id"
                        ? "/allReagentRequests"
                        : "/reagentRequests",
            });
        } else if (actionType === "submit" && data) {
            setIsEditing(false);
            await request(`${base}/api/v1/reagent-request/${reagentRequest.id}`, z.void(), {
                method: "PUT",
                json: data,
            });
        }
    };

    return (
        <>
            <DetailsEditPage
                baseUrl={
                    url === "/_app/_pOfficerLayout/allReagentRequests/$id"
                        ? "/allReagentRequests"
                        : "/reagentRequests"
                }
                url={url}
                fields={fields}
                onAction={handleAction}
                editableFields={["userComments", "procurementComments", "status"]}
            />
        </>
    );
}
