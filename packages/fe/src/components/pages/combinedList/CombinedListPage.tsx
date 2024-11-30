import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { base } from "api/request";
import { CommonTable } from "components/commonTable/CommonTable";
import CombinedListSchema, {
    CombinedList,
} from "shared/generated/zod/modelSchema/CombinedListSchema";

const columns: GridColDef<CombinedList>[] = [
    { field: "id", headerName: "ID", width: 90, sortable: false },
    { field: "name", headerName: "Name", width: 150 },
    { field: "structure", headerName: "Structure", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 110 },
    { field: "unit", headerName: "Unit", width: 100, sortable: false },
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

export const CombinedListPage = () => {
    return (
        <Box sx={{ mb: 5 }}>
            <CommonTable<CombinedList>
                columns={columns}
                url={`${base}/api/v1/list`}
                schema={CombinedListSchema}
                // onRowClick={(row: Reagent) => {
                //     navigate({ to: `/reagents/${row.id}`, replace: false });
                // }}
                searchBy={{
                    name: true,
                    room: true,
                    structure: true,
                    producer: true,
                    cas: true,
                    catalogId: true,
                    catalogLink: true,
                }}
                // onAdd={openAddModal}
                addButtonText="add Sample"
            />
            <Outlet />
        </Box>
    );
};
