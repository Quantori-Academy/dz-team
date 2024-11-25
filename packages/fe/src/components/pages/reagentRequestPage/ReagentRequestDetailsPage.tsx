import { Box, Typography } from "@mui/material";
import { useLoaderData, useNavigate } from "@tanstack/react-router";

import {
    ReagentRequestDetails,
    ReagentRequestDetailsContract,
} from "api/reagentRequestDetails/contract";
import { base, request } from "api/request";
import { DetailsEditPage } from "components/DetailsEditPage/DetailsEditPage";

export function ReagentRequestDetailsPage({ url }: { url: "/_app/reagentRequests/$id" }) {
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
        { label: "id", name: "id", disabled: true },
        { label: "userId", name: "userId" },
        { label: "name", name: "reagentName" },
        { label: "structure", name: "structure" },
        { label: "cas", name: "casNumber" },
        { label: "quantity", name: "desiredQuantity" },
        { label: "unit", name: "Unit" },
        { label: "userComments", name: "userComments" },
        { label: "procurementComments", name: "procurementComments" },
        { label: "status", name: "status" },
        { label: "createdAt", name: "", type: "date" },
        { label: "updatedAt", name: "", type: "date" },
    ];

    const reagentRequestsPagePath = "/reagentRequests";

    const handleAction = async (actionType: "submit" | "delete", data?: ReagentRequestDetails) => {
        if (actionType === "delete") {
            await request(
                `${base}/api/v1/reagent-request/${reagentRequest.id}`,
                ReagentRequestDetailsContract, // TODO: add correct contract when it's ready
                {
                    method: "DELETE",
                },
            );
            navigate({
                to: reagentRequestsPagePath,
            });
        } else if (actionType === "submit" && data) {
            await request(
                `${base}/api/v1/reagent-request/${reagentRequest.id}`,
                ReagentRequestDetailsContract, // TODO: add correct contract when it's ready
                {
                    method: "PUT",
                    json: data,
                },
            );
        }
    };

    return (
        <>
            <DetailsEditPage
                baseUrl={reagentRequestsPagePath}
                url={url}
                fields={fields}
                onAction={handleAction}
                editableFields={["userComments", "procurementComments", "status"]}
            />
        </>
    );
}
