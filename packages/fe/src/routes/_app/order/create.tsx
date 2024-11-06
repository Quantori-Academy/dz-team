import { createFileRoute } from "@tanstack/react-router";

import { CreateOrder } from "components/pages/orders/CreateOrder";

export const Route = createFileRoute("/_app/order/create")({
    component: () => <CreateOrder />,
});
