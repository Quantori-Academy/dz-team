import { createContext, useRef, useState } from "react";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useUnit } from "effector-react";

import { base } from "api/request";
import { CommonTable } from "components/commonTable/CommonTable";
import { $formData, initialFormData, setFormData, submitReagent } from "stores/reagents";

import { ReagentSchema } from "../../../../../shared/generated/zod";
import { ReagentFormModal } from "./ReagentFormModal";

type ReloadReagentsContext = {
    ref: React.MutableRefObject<{ refresh: () => void } | null>;
};
export const ReagentsTableContext = createContext<ReloadReagentsContext>({
    ref: { current: null },
});

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, sortable: false },
    { field: "name", headerName: "Name", width: 150 },
    { field: "structure", headerName: "Structure", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 110 },
    { field: "unit", headerName: "Unit", width: 100, sortable: false },
    { field: "size", headerName: "Size", width: 100, sortable: false },
    { field: "expirationDate", headerName: "Expiration Date", width: 150 },
    { field: "cas", headerName: "CAS", width: 120 },
    { field: "producer", headerName: "Producer", width: 150 },
    { field: "catalogId", headerName: "Catalog ID", width: 120 },
    { field: "catalogLink", headerName: "Catalog Link", width: 150 },
    { field: "pricePerUnit", headerName: "Price Per Unit", width: 150 },
    { field: "category", headerName: "Category", width: 120 },
    { field: "createdAt", headerName: "Created At", width: 150 },
    { field: "updatedAt", headerName: "Updated At", width: 150 },
];

export const ReagentsListPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleAddReagentClick = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const navigate = useNavigate();

    const formData = useUnit($formData);

    const submitReagentEvent = useUnit(submitReagent);
    const tableRef = useRef(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "quantity" || name === "pricePerUnit" ? Number(value) : value,
        });
    };

    const handleSubmit = () => {
        submitReagentEvent(formData);
        alert("Reagent added successfully!");
        setFormData(initialFormData);
        handleModalClose();
    };

    return (
        <ReagentsTableContext.Provider value={{ ref: tableRef }}>
            <Box sx={{ mb: 5 }}>
                <CommonTable
                    ref={tableRef}
                    columns={columns}
                    url={`${base}/api/v1/reagents`}
                    schema={ReagentSchema}
                    onRowClick={(row) => {
                        navigate({ to: `/reagents/${row.id}`, replace: false });
                    }}
                    searchBy={{
                        name: true,
                        // TODO: have an error with description
                        // description: true,
                        structure: true,
                        producer: true,
                        cas: true,
                        catalogId: true,
                        catalogLink: true,
                    }}
                    onAdd={handleAddReagentClick}
                    addButtonText="add reagent"
                />
                <ReagentFormModal
                    isOpen={isModalOpen}
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleModalClose={handleModalClose}
                />

                <Outlet />
            </Box>
        </ReagentsTableContext.Provider>
    );
};
