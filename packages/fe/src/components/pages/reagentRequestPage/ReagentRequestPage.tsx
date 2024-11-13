import { GridColDef } from "@mui/x-data-grid";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useUnit } from "effector-react";

import { ReagentRequest, ReagentRequestType } from "api/reagentRequest";
import { base } from "api/request";
import { UserRole } from "api/self";
import { CommonTable } from "components/commonTable/CommonTable";
import { $auth } from "stores/auth";

const reagentRequestColumns: GridColDef[] = [
    { field: "reagentName", headerName: "Reagent Name", width: 200 },
    { field: "structure", headerName: "Structure", width: 200 },
    { field: "casNumber", headerName: "CAS Number", width: 150 },
    { field: "desiredQuantity", headerName: "Desired Quantity", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "userComments", headerName: "User Comments", width: 200 },
    { field: "procurementComments", headerName: "Procurement Comments", width: 200 },
    { field: "creationDate", headerName: "Date Created", width: 150 },
    { field: "dateModified", headerName: "Date Modified", width: 150 },
];

export function ReagentRequestPage() {
    const authState = useUnit($auth);
    const navigate = useNavigate();

    return (
        <>
            <CommonTable<ReagentRequestType>
                columns={reagentRequestColumns}
                url={`${base}/api/v1/reagent-request`}
                schema={ReagentRequest}
                onRowClick={(row) => {
                    if (
                        authState !== false &&
                        authState?.self.role === UserRole.procurementOfficer
                    ) {
                        navigate({ to: `/allReagentRequests/${row.id}`, replace: false });
                    } else if (
                        authState !== false &&
                        authState?.self.role === UserRole.researcher
                    ) {
                        navigate({ to: `/reagentRequests/${row.id}`, replace: false });
                    }
                }}
                searchBy={{
                    name: true,
                    description: true,
                    structure: true,
                    producer: true,
                    cas: true,
                    catalogId: true,
                    catalogLink: true,
                }}
                // TODO: Add button when Create Reagent Request page is ready
                addButtonText="Create a Reagent Request"
            />

            <Outlet />
        </>
    );
}
