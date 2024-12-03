import { Box } from "@mui/material";
import { Outlet, useNavigate } from "@tanstack/react-router";

import { CommonTable } from "components/commonTable/CommonTable";
import { Order, OrderSchema } from "shared/generated/zod";

const headers = [
    { field: "seller", headerName: "Seller", width: 170 },
    { field: "description", headerName: "Description ", width: 170 },
    { field: "createdAt", headerName: "Created Date", width: 170 },
    { field: "updatedAt", headerName: "Updated Date", width: 170 },
    {
        field: "reagents",
        headerName: "Reagents",
        width: 300,
        renderCell: (params: { value: { id: string; name: string }[] }) => {
            const reagents = params.value as Array<{ id: string; name: string }>;
            return reagents.map((reagent) => reagent.name).join(", ");
        },
    },
];

export const OrderList = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate({ to: "/createOrder" });
    };

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
                <CommonTable<Order>
                    columns={headers}
                    url={`/orders`}
                    schema={OrderSchema}
                    onRowClick={(row: Order) => {
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
