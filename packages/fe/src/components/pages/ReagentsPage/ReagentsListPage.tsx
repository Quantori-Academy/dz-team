import { useRef } from "react";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useUnit } from "effector-react";

import { base } from "api/request";
import { CommonTable, CommonTableRef } from "components/commonTable/CommonTable";
import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";
import { submitReagent } from "stores/reagents";

import { Reagent, ReagentSchema } from "../../../../../shared/generated/zod";
import { TableContext } from "../../commonTable/TableContext";
import { ReagentFormModal } from "./ReagentFormModal";

const columns: GridColDef<Reagent>[] = [
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
    const navigate = useNavigate();

    const tableRef = useRef<CommonTableRef | null>(null);

    const submitReagentEvent = useUnit(submitReagent);

    const openAddModal = async () => {
        const response = await createModal({
            name: "reagent_modal",
            title: "Add new Reagent",
            message: <ReagentFormModal />,
            labels: { ok: "Submit", cancel: "Cancel" },
        });

        if (response) {
            submitReagentEvent();
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
                <CommonTable<Reagent>
                    ref={tableRef}
                    columns={columns}
                    url={`${base}/api/v1/reagents`}
                    schema={ReagentSchema}
                    onRowClick={(row: Reagent) => {
                        navigate({ to: `/reagents/${row.id}`, replace: false });
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
                    onAdd={openAddModal}
                    addButtonText="add reagent"
                />
                <Outlet />
            </Box>
        </TableContext.Provider>
    );
};
