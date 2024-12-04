import { Box, Typography } from "@mui/material";
import { useLoaderData, useParams } from "@tanstack/react-router";
import { z } from "zod";

import { ReagentRequestDetails } from "api/reagentRequestDetails/contract";
import { request } from "api/request";
import { DetailsEditPage } from "components/DetailsEditPage/DetailsEditPage";

export function ReagentRequestDetailsPage({ url }: { url: "/_app/reagentRequests/$id" }) {
    const reagentRequest = useLoaderData({ from: url });
    const { id } = useParams({ from: url });

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
        { label: "Name", name: "name" },
        { label: "Structure", name: "structure" },
        { label: "CAS", name: "cas" },
        { label: "Quantity", name: "quantity" },
        { label: "Unit", name: "unit" },
        { label: "User Comments", name: "userComments" },
        { label: "Procurement Comments", name: "procurementComments" },
        { label: "Status", name: "status" },
        { label: "Update Date", name: "updatedAt" },
    ];

    const reagentRequestsPagePath = "/reagentRequests";

    const handleAction = async (actionType: "submit" | "delete", data?: ReagentRequestDetails) => {
        if (actionType === "submit" && data) {
            await request(`/requests/${id}`, z.string(), {
                method: "PATCH",
                json: data,
            });
        }
    };

    return (
        <>
            <DetailsEditPage
                baseUrl={reagentRequestsPagePath}
                url={url}
                fields={fields}
                onAction={handleAction}
                editableFields={["userComments", "procurementComments"]}
                removeDeleteButton={false}
            />
        </>
    );
}
