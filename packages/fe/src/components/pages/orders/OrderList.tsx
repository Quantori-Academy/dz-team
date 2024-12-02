import { useRef } from "react";
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "@tanstack/react-router";

import { base } from "api/request";
import { CommonTable, CommonTableRef } from "components/commonTable/CommonTable";
import { TableContext } from "components/commonTable/TableContext";
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
    const tableRef = useRef<CommonTableRef | null>(null);
    const handleClick = () => {
        navigate({ to: "/createOrder" });
    };

    return (
        <TableContext.Provider value={{ ref: tableRef }}>
            <Box
                sx={{
                    padding: "40px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                <CommonTable<Order>
                    ref={tableRef}
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
            </Box>
            <Outlet />
        </TableContext.Provider>
    );
};
