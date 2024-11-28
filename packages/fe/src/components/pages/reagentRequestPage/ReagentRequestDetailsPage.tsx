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
        { label: "ID", name: "id", disabled: true },
        { label: "User ID", name: "userId" },
        { label: "Name", name: "name" },
        { label: "Structure", name: "structure" },
        { label: "CAS", name: "cas" },
        { label: "Quantity", name: "quantity" },
        { label: "Unit", name: "unit" },
        { label: "User Comments", name: "userComments" },
        { label: "Procurement Comments", name: "procurementComments" },
        { label: "Status", name: "status" },
        { label: "Creation Date", name: "createdAt" },
        { label: "Update Date", name: "updatedAt" },
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
