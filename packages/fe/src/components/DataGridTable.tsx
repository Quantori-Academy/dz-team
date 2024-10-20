import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const rows = [
    {
        id: "1",
        name: "Material 1",
        structure: "C6H12O6",
        description: "Material 1 description",
        quantity: 10,
        unit: "g",
        size: 10,
        expirationDate: null,
        storageLocation: "Room temperature",
        cas: null,
        producer: null,
        catalogId: null,
        catalogLink: null,
        pricePerUnit: null,
        createdAt: "2021-09-01T00:00:00.000Z",
        updatedAt: "2021-09-01T00:00:00.000Z",
    },
    {
        id: "2",
        name: "Material 2",
        structure: "C6H12O6",
        description: "Material 2 description",
        quantity: 20,
        unit: "g",
        size: 20,
        expirationDate: null,
        storageLocation: "Room temperature",
        cas: null,
        producer: null,
        catalogId: null,
        catalogLink: null,
        pricePerUnit: null,
        createdAt: "2021-09-01T00:00:00.000Z",
        updatedAt: "2021-09-01T00:00:00.000Z",
    },
    {
        id: "3",
        name: "Material 3",
        structure: "C6H12O6",
        description: "Material 3 description",
        quantity: 30,
        unit: "g",
        size: 30,
        expirationDate: null,
        storageLocation: "Room temperature",
        cas: null,
        producer: null,
        catalogId: null,
        catalogLink: null,
        pricePerUnit: null,
        createdAt: "2021-09-01T00:00:00.000Z",
        updatedAt: "2021-09-01T00:00:00.000Z",
    },
    {
        id: "4",
        name: "Material 4",
        structure: "C6H12O6",
        description: "Material 4 description",
        quantity: 40,
        unit: "g",
        size: 40,
        expirationDate: null,
        storageLocation: "Room temperature",
        cas: null,
        producer: null,
        catalogId: null,
        catalogLink: null,
        pricePerUnit: null,
        createdAt: "2021-09-01T00:00:00.000Z",
        updatedAt: "2021-09-01T00:00:00.000Z",
    },
];

const columns = [
    { field: "name", headername: "Name" },
    { field: "structure", headername: "Structure" },
    { field: "description", headername: "Description" },
    { field: "quantity", headername: "Quantity" },
    { field: "unit", headername: "Unit" },
    { field: "size", headername: "Size" },
    { field: "expirationDate", headername: "Expiration Date" },
    { field: "storageLocation", headername: "Storage Location" },
    { field: "cas", headername: "CAS" },
    { field: "producer", headername: "Producer" },
    { field: "catalogId", headername: "Catalog ID" },
    { field: "catalogLink", headername: "Catalog Link" },
    { field: "pricePerUnit", headername: "Price Per Unit" },
];

export const DataGridTable = () => {
    return (
        <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => {
                    return row.id;
                }}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};
