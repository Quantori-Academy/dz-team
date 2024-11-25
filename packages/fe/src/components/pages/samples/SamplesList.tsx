import { Box } from "@mui/material";
import { useGate, useUnit } from "effector-react";

import { Grid } from "components/dataGrid/Grid";
import { $samplesList, SamplesGate } from "stores/samples";

const columns = [
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
    const samples = useUnit($samplesList);

    // in common table i pass the same structure of contract but it throws same error always

    return (
        <Box sx={{ mb: 5 }}>
            <Grid rows={samples} headers={columns} />
            {/* <CommonTable<Sample>
                columns={columns}
                url={`${base}/api/v1/samples`}
                schema={SampleSchema}
                searchBy={{
                    name: true,
                    description: true,
                    structure: true,
                }}
                addButtonText="add sample"
            />
            <Outlet /> */}
        </Box>
    );
};
