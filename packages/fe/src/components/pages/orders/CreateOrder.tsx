import { Box } from "@mui/material";
import { Outlet } from "@tanstack/react-router";

import { Grid } from "components/dataGrid/Grid";

const headers = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "structure", headerName: "Structure", width: 170 },
    { field: "cas", headerName: "Cas", width: 170 },
    { field: "producer", headerName: "Producer", width: 170 },
    { field: "catalogId", headerName: "Catalog Id", width: 150 },
    { field: "catalogLink", headerName: "Catalog Link", width: 170 },
    { field: "units", headerName: "Units ", width: 170 },
    { field: "pricePerUnit", headerName: "Price Per Unit", width: 170 },
    { field: "quantity", headerName: "Quantity", width: 170 },
    { field: "amount", headerName: "Amount", width: 170 },
];
export const CreateOrder = () => {
    // TODO: this table create button and rows will be implemented in the other branch
    return (
        <>
            <Box
                sx={{
                    padding: "40px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                <Grid
                    rows={[]}
                    headers={headers}
                    showSearchField={false}
                    showToolbar={true}
                    addButtonLabel="Create a new reagent for an order"
                />
            </Box>
            <Outlet />
        </>
    );
};
