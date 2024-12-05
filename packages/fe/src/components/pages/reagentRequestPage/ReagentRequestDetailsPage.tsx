import { Box, Typography } from "@mui/material";
import { useLoaderData, useParams } from "@tanstack/react-router";
import { useUnit } from "effector-react";
import { z } from "zod";

import { request } from "api/request";
import { UserRole } from "api/self";
import { DetailsEditPage } from "components/DetailsEditPage/DetailsEditPage";
import { RequestUpdateBody } from "shared/zodSchemas/request/requestSchemas";
import { $auth } from "stores/auth";

export function ReagentRequestDetailsPage({ url }: { url: "/_app/reagentRequests/$id" }) {
    const reagentRequest = useLoaderData({ from: url });
    const { id } = useParams({ from: url });
    const auth = useUnit($auth);

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
        { label: "User Comments", name: "commentsUser" },
        { label: "Procurement Comments", name: "commentsProcurement" },
        { label: "Status", name: "status" },
        { label: "Update Date", name: "updatedAt" },
    ];

    const reagentRequestsPagePath = "/reagentRequests";

    const handleAction = async (actionType: "submit" | "delete", data?: RequestUpdateBody) => {
        if (actionType === "submit" && data) {
            await request(`/requests/${id}`, z.string(), {
                method: "PATCH",
                json:
                    auth && auth.self.role === UserRole.procurementOfficer
                        ? { commentsProcurement: data.commentsProcurement }
                        : { commentsUser: data.commentsUser },
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
                editableFields={
                    auth && auth.self.role === UserRole.procurementOfficer
                        ? ["commentsProcurement"]
                        : ["commentsUser"]
                }
                removeDeleteButton={false}
            />
        </>
    );
}
