import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

import { base } from "api/request";
import { CommonTable } from "components/commonTable/CommonTable";
import { contractSampleType, Sample } from "shared/generated/zod";

const columns: GridColDef<Sample>[] = [
    { field: "id", headerName: "ID", width: 90, sortable: false },
    { field: "name", headerName: "Name", width: 150 },
    { field: "structure", headerName: "Structure", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 110 },
    { field: "quantityinit", headerName: "Initial Quantity", width: 110 },
    { field: "unit", headerName: "Unit", width: 100, sortable: false },
    { field: "storageLocation", headerName: "Storage Location", width: 100, sortable: false },
    { field: "category", headerName: "Category", width: 150 },
    { field: "container", headerName: "container", width: 120 },
    { field: "createdAt", headerName: "Created At", width: 150 },
    { field: "updatedAt", headerName: "Updated At", width: 150 },
    { field: "storageId", headerName: "Storage Id", width: 150 },
];

export const SamplesList = () => {
    return (
        <Box sx={{ mb: 5 }}>
            <CommonTable<Sample>
                columns={columns}
                url={`${base}/api/v1/samples`}
                schema={contractSampleType}
                // onRowClick={(row: Reagent) => {
                //     navigate({ to: `/reagents/${row.id}`, replace: false });
                // }}
                searchBy={{
                    name: true,
                }}
                addButtonText="add reagent"
            />
            <Outlet />
        </Box>
    );
};
