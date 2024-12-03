import { useRef, useState } from "react";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Outlet, useNavigate } from "@tanstack/react-router";

import { CreateReagentRequestType, initialFormData } from "api/reagentRequest";
import { request } from "api/request";
import { CommonTable, CommonTableRef } from "components/commonTable/CommonTable";
import { TableContext } from "components/commonTable/TableContext";
import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";

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

    const [formData, setFormData] = useState<CreateReagentRequestType>(initialFormData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "quantity" || name === "pricePerUnit" ? Number(value) : value,
        });
    };

    const submitReagentRequest = async (data: CreateReagentRequestType) => {
        const response = await request(`/reagent-request`, ReagentRequestSchema, {
            method: "POST",
            json: data,
            throwOnError: true,
        });
        return response;
    };

    const handleSubmit = () => {
        submitReagentRequest(formData);
        setFormData(initialFormData);
    };

    const handleRowClick = (row: ReagentRequest) => {
        navigate({ to: `/reagentRequests/${row.id}`, replace: false });
    };

    const openAddModal = async () => {
        const response = await createModal({
            name: "reagent_request_modal",
            title: "Add New Reagent Request",
            message: <ReagentRequestFormModal formData={formData} handleChange={handleChange} />,
            labels: { ok: "Submit", cancel: "Cancel" },
        });

        if (response) {
            handleSubmit();
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
                    url={`/reagent-request`}
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
                    onAdd={openAddModal}
                    addButtonText="Create a Reagent Request"
                />

                <Outlet />
            </Box>
        </TableContext.Provider>
    );
}
