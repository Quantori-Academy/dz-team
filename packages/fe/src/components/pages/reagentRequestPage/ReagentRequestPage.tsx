import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useUnit } from "effector-react";

import {
    CreateReagentRequestType,
    initialFormData,
    ReagentRequest,
    ReagentRequestType,
} from "api/reagentRequest";
import { base, request } from "api/request";
import { UserRole } from "api/self";
import { CommonTable } from "components/commonTable/CommonTable";
import { $auth } from "stores/auth";

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
    const authState = useUnit($auth);
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
        return response!;
    };

    const handleSubmit = () => {
        submitReagentRequest(formData);
        alert("Reagent request added successfully!");
        setFormData(initialFormData);
        handleModalClose();
    };

    return (
        <>
            <CommonTable<ReagentRequestType>
                columns={reagentRequestColumns}
                url={
                    authState !== false && authState?.self.role === UserRole.procurementOfficer
                        ? `${base}/api/v1/reagent-request`
                        : `${base}/api/v1/reagent-request-res`
                }
                schema={ReagentRequest}
                onRowClick={(row: ReagentRequestType) => {
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
