import { useRef } from "react";
import { Outlet, useNavigate } from "@tanstack/react-router";

import { CommonTable, CommonTableRef } from "components/commonTable/CommonTable";
import { TableContext } from "components/commonTable/TableContext";
import { Order, OrderSchema } from "shared/generated/zod";

const headers = [
    { field: "title", headerName: "Title", width: 170 },
    { field: "seller", headerName: "Seller", width: 170 },
    { field: "description", headerName: "Description ", width: 170 },
    { field: "status", headerName: "Status ", width: 170 },
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
            <CommonTable<Order>
                ref={tableRef}
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
                toolbarButtons={[
                    {
                        label: "Create a new order",
                        onClick: handleClick,
                    },
                ]}
            />
            <Outlet />
        </TableContext.Provider>
    );
};
