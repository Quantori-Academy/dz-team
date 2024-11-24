import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useGate } from "effector-react";

import { base } from "api/request";
import { CommonTable } from "components/commonTable/CommonTable";
// import { Grid } from "components/dataGrid/Grid";
import { Sample, sampleSchemaContract } from "shared/generated/zod/modelSchema/SampleSchema";
import { SamplesGate } from "stores/samples";

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
    useGate(SamplesGate);
    // const samples = useUnit($samplesList);

    return (
        <Box sx={{ mb: 5 }}>
            {/* <Grid rows={samples} headers={headers} /> */}
            <CommonTable<Sample>
                columns={columns}
                url={`${base}/api/v1/samples`}
                schema={sampleSchemaContract}
                searchBy={{
                    name: true,
                    description: true,
                    structure: true,
                    producer: true,
                    cas: true,
                    catalogId: true,
                    catalogLink: true,
                }}
                addButtonText="add reagent"
            />
            <Outlet />
        </Box>
    );
};
