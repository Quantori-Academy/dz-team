import { Typography } from "@mui/material";
import { Outlet, useNavigate } from "@tanstack/react-router";

import { base } from "api/request";
import { CommonTable } from "components/commonTable/CommonTable";
import LayoutBox from "components/LayoutBox/LayoutBox";
import { Order, OrderSchema } from "shared/generated/zod";

const headers = [
    { field: "title", headerName: "Title", width: 150 },
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
        navigate({ to: "/create-order" });
    };

    return (
        <>
            <LayoutBox>
                <Typography variant="h5">Order List</Typography>
                <CommonTable<Order>
                    columns={headers}
                    url={`${base}/api/v1/orders`}
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
            </LayoutBox>
            <Outlet />
        </>
    );
};
