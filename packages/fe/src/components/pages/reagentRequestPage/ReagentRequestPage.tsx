import { useRef } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Outlet, useNavigate } from "@tanstack/react-router";

import { base } from "api/request";
import { CommonTable, CommonTableRef } from "components/commonTable/CommonTable";
import { TableContext } from "components/commonTable/TableContext";

import { ReagentRequest, ReagentRequestSchema } from "../../../../../shared/generated/zod";

const reagentRequestColumns: GridColDef[] = [
    { field: "name", headerName: "Reagent Name", width: 200 },
    { field: "structure", headerName: "Structure", width: 200 },
    { field: "cas", headerName: "CAS Number", width: 150 },
    { field: "quantity", headerName: "Desired Quantity", width: 150 },
    { field: "unit", headerName: "Unit", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "userComments", headerName: "User Comments", width: 200 },
    { field: "procurementComments", headerName: "Procurement Comments", width: 200 },
    { field: "createdAt", headerName: "Date Created", width: 150 },
    { field: "updatedAt", headerName: "Date Modified", width: 150 },
];

export function ReagentRequestPage() {
    const navigate = useNavigate();
    const tableRef = useRef<CommonTableRef | null>(null);

    const handleRowClick = (row: ReagentRequest) => {
        navigate({ to: `/reagentRequests/${row.id}`, replace: false });
    };

    return (
        <TableContext.Provider value={{ ref: tableRef }}>
            <CommonTable<ReagentRequest>
                columns={reagentRequestColumns}
                ref={tableRef}
                url={`${base}/api/v1/reagent-request`}
                schema={ReagentRequestSchema}
                onRowClick={handleRowClick}
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
        </TableContext.Provider>
    );
}
