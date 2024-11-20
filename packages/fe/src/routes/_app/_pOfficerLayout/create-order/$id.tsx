import { createFileRoute } from "@tanstack/react-router";

import { OrderReagentDetail } from "components/pages/orders/OrderReagentDetail";

export const Route = createFileRoute("/_app/_pOfficerLayout/create-order/$id")({
    component: () => <OrderReagentDetail />,
});
