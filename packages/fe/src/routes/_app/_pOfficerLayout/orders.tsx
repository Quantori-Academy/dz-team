import { createFileRoute } from "@tanstack/react-router";

import { OrderList } from "components/pages/orders/OrderList";

export const Route = createFileRoute("/_app/_pOfficerLayout/orders")({
    component: () => <OrderList />,
});
