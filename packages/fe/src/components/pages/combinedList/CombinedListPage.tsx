import { useRef } from "react";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Outlet, useNavigate } from "@tanstack/react-router";

import { CommonTable, CommonTableRef } from "components/commonTable/CommonTable";
import { TableContext } from "components/commonTable/TableContext";
import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";
import CombinedListSchema, {
    CombinedList,
} from "shared/generated/zod/modelSchema/CombinedListSchema";

import { AddSampleForm } from "./AddSampleForm";

const columns: GridColDef<CombinedList>[] = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "category", headerName: "Category", width: 120 },
    { field: "structure", headerName: "Structure", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 110 },
    { field: "storageLocation", headerName: "Storage Location", width: 120 },
    { field: "unit", headerName: "Unit", width: 100, sortable: false },
    { field: "expirationDate", headerName: "Expiration Date", width: 150 },
    { field: "cas", headerName: "CAS", width: 120 },
    { field: "producer", headerName: "Producer", width: 150 },
    { field: "catalogId", headerName: "Catalog ID", width: 120 },
    { field: "catalogLink", headerName: "Catalog Link", width: 150 },
    { field: "pricePerUnit", headerName: "Price Per Unit", width: 150 },
    { field: "createdAt", headerName: "Created At", width: 150 },
    { field: "updatedAt", headerName: "Updated At", width: 150 },
];

export const CombinedListPage = () => {
    const tableRef = useRef<CommonTableRef | null>(null);
    const navigate = useNavigate();
    const openAddModal = async () => {
        await createModal({
            name: "sample_modal",
            title: "Add New Sample",
            message: <AddSampleForm onClose={removeModal} />,
        });

        tableRef.current?.refresh();
        removeModal();
    };
    return (
        <TableContext.Provider value={{ ref: tableRef }}>
            <Box sx={{ mb: 5 }}>
                <CommonTable<CombinedList>
                    ref={tableRef}
                    columns={columns}
                    url={`/list`}
                    onRowClick={(row: CombinedList) => {
                        if (row.category === "reagent") {
                            navigate({ to: `/reagents/${row.id}`, replace: false });
                        } else if (row.category === "sample") {
                            navigate({ to: `/combinedList/${row.id}`, replace: false });
                        }
                    }}
                    schema={CombinedListSchema}
                    searchBy={{
                        name: true,
                        structure: true,
                    }}
                    onAdd={openAddModal}
                    addButtonText="Add New Sample"
                />
                <Outlet />
            </Box>
        </TableContext.Provider>
    );
};
