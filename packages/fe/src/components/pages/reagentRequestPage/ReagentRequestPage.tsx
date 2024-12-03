import { useRef } from "react";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useUnit } from "effector-react";
import { jwtDecode } from "jwt-decode";

import { UserRole } from "api/self";
import { CommonTable, CommonTableRef } from "components/commonTable/CommonTable";
import { TableContext } from "components/commonTable/TableContext";
import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";
import { $auth } from "stores/auth";
import { addReagentRequestFx } from "stores/reagentRequest";

import { ReagentRequest, ReagentRequestSchema } from "../../../../../shared/generated/zod";
import { ReagentRequestFormModal } from "./ReagentRequestFormModal";

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
    const auth = useUnit($auth);

    let userId: string;

    const role = auth ? auth.self.role : null;

    if (auth) {
        const decodedToken: { userId: string } = jwtDecode(auth.token);

        userId = decodedToken.userId;
    } else {
        userId = "";
    }

    const handleRowClick = (row: ReagentRequest) => {
        navigate({ to: `/reagentRequests/${row.id}`, replace: false });
    };

    const submitReagentRequest = useUnit(addReagentRequestFx);

    const openAddModal = async () => {
        const response = await createModal({
            name: "reagent_request_modal",
            title: "Add New Reagent Request",
            message: <ReagentRequestFormModal />,
            labels: { ok: "Submit", cancel: "Cancel" },
        });

        if (response) {
            await submitReagentRequest();
            if (tableRef.current?.refresh) {
                tableRef.current.refresh();
            }
        }
        removeModal();
    };

    return (
        <TableContext.Provider value={{ ref: tableRef }}>
            <Box
                sx={{
                    padding: "40px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    mb: 5,
                }}
            >
                <CommonTable<ReagentRequest>
                    columns={reagentRequestColumns}
                    ref={tableRef}
                    url={role === UserRole.researcher ? `/requests/user/${userId}` : `/requests`}
                    schema={ReagentRequestSchema}
                    onRowClick={handleRowClick}
                    searchBy={{
                        name: true,
                        structure: true,
                        cas: true,
                        createdAt: true,
                        updatedAt: true,
                    }}
                    onAdd={openAddModal}
                    addButtonText="Create a Reagent Request"
                />

                <Outlet />
            </Box>
        </TableContext.Provider>
    );
}
