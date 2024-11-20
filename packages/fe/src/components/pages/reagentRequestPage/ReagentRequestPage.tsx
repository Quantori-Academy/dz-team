import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Outlet, useNavigate } from "@tanstack/react-router";

import {
    CreateReagentRequestType,
    initialFormData,
    ReagentRequest,
    ReagentRequestType,
} from "api/reagentRequest";
import { base, request } from "api/request";
import { CommonTable } from "components/commonTable/CommonTable";

import { ReagentRequestFormModal } from "./ReagentRequestFormModal";

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
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<CreateReagentRequestType>(initialFormData);
    const handleModalClose = () => setIsModalOpen(false);
    const handleAddReagentRequestClick = () => setIsModalOpen(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "quantity" || name === "pricePerUnit" ? Number(value) : value,
        });
    };

    const submitReagentRequest = async (data: CreateReagentRequestType) => {
        const response = await request(`${base}/api/v1/reagent-request`, ReagentRequest, {
            method: "POST",
            json: data,
            throwOnError: true,
        });
        return response;
    };

    const handleSubmit = () => {
        submitReagentRequest(formData);
        setFormData(initialFormData);
        handleModalClose();
    };

    const handleRowClick = (row: ReagentRequestType) => {
        navigate({ to: `/reagentRequests/${row.id}`, replace: false });
    };

    return (
        <>
            <CommonTable<ReagentRequestType>
                columns={reagentRequestColumns}
                url={`${base}/api/v1/reagent-request`}
                schema={ReagentRequest}
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
                onAdd={handleAddReagentRequestClick}
                addButtonText="Create a Reagent Request"
            />

            <ReagentRequestFormModal
                isOpen={isModalOpen}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleModalClose={handleModalClose}
            />

            <Outlet />
        </>
    );
}
