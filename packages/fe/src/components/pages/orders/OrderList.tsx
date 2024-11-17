import { Box, Typography } from "@mui/material";
import { Outlet, useNavigate } from "@tanstack/react-router";

import { base } from "api/request";
import { CommonTable } from "components/commonTable/CommonTable";
import { OrderSchema } from "shared/generated/zod";

const headers = [
    { field: "title", headerName: "Title", width: 150 },
    { field: "seller", headerName: "Seller", width: 170 },
    { field: "description", headerName: "Description ", width: 170 },
    { field: "createdAt", headerName: "Created Date", width: 170 },
    { field: "updatedAt", headerName: "Updated Date", width: 170 },
];
// const placeholder = "Search by seller, status";

const boxStyles = {
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
};

export const OrderList = () => {
    // useGate(OrdersGate);
    // const orders = useUnit($OrdersList);
    const navigate = useNavigate();

    // console.log("orders", orders)

    const handleClick = () => {
        navigate({ to: "/orders/create" });
    };

    return (
        <>
            <Box sx={boxStyles}>
                <Typography variant="h5">Order List</Typography>
                <CommonTable
                    // ref={tableRef}
                    columns={headers}
                    url={`${base}/api/v1/orders`}
                    schema={OrderSchema}
                    onRowClick={(row) => {
                        navigate({ to: `/orders/${row.id}`, replace: false });
                    }}
                    searchBy={{
                        title: true,
                        description: true,
                        seller: true,
                        createdAt: true,
                        updatedAt: true,
                    }}
                    onAdd={handleClick}
                    addButtonText="Create a new order"
                />
            </Box>
            <Outlet />
        </>
    );
};
