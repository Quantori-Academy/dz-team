import { useRef, useState } from "react";
import { Box, Button, Dialog, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useUnit } from "effector-react";

import { UserRole } from "api/self";
import { CommonTable, CommonTableRef } from "components/commonTable/CommonTable";
import { TableContext } from "components/commonTable/TableContext";
import { $auth } from "stores/auth";
import { addReagentRequestFx, resetFormData } from "stores/reagentRequest";

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
    { field: "commentsUser", headerName: "User Comments", width: 200 },
    { field: "commentsProcurement", headerName: "Procurement Comments", width: 200 },
    { field: "createdAt", headerName: "Date Created", width: 150 },
    { field: "updatedAt", headerName: "Date Modified", width: 150 },
];

export function ReagentRequestPage() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const tableRef = useRef<CommonTableRef | null>(null);
    const auth = useUnit($auth);

    const userId = auth ? auth.userId : "";

    const role = auth ? auth.self.role : null;

    const handleRowClick = (row: ReagentRequest) => {
        navigate({ to: `/reagentRequests/${row.id}`, replace: false });
    };

    const submitReagentRequest = useUnit(addReagentRequestFx);

    const handleSubmit = async () => {
        const result = await submitReagentRequest();
        if (result !== undefined) {
            setIsOpen(false);
        }
        if (tableRef.current?.refresh) {
            tableRef.current.refresh();
        }
    };

    const openAddModal = () => {
        resetFormData();
        setIsOpen(true);
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
                    onAdd={
                        auth && auth.self.role === UserRole.procurementOfficer
                            ? undefined
                            : openAddModal
                    }
                    addButtonText="Create a Reagent Request"
                />

                <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                    <Box sx={{ p: "18px" }}>
                        <Typography variant="h5">Add New Reagent Request</Typography>
                        <Typography variant="body1" sx={{ my: "20px" }}>
                            <ReagentRequestFormModal />
                        </Typography>
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            <Button variant="contained" onClick={handleSubmit}>
                                Submit
                            </Button>
                            <Button variant="outlined" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Dialog>

                <Outlet />
            </Box>
        </TableContext.Provider>
    );
}
