import { createFileRoute } from "@tanstack/react-router";

import { getOrdersDetailsApi } from "api/orderDetails/getOrderDetails";
import { OrderDetailsPage } from "components/pages/orders/details";

export const Route = createFileRoute("/_app/_pOfficerLayout/orders/$id")({
    loader: async ({ params }) => await getOrdersDetailsApi({ id: params.id }),
    component: () => <OrderDetailsPage />,
});
