import { useState } from "react";

import { CreateOrderReagent } from "api/order/contract";

export const useReagents = () => {
    const [orderItems, setOrderItems] = useState<CreateOrderReagent[]>([]);

    const deleteReagent = (reagentToDelete: CreateOrderReagent) => {
        setOrderItems((prevReagents) =>
            prevReagents.filter((reagent) => reagent.id !== reagentToDelete.id),
        );
    };

    const editReagent = (updatedReagent: CreateOrderReagent) => {
        setOrderItems((prevReagents) =>
            prevReagents.map((reagent) =>
                reagent.id === updatedReagent.id ? updatedReagent : reagent,
            ),
        );
    };
    const addReagent = (newReagent: CreateOrderReagent) => {
        setOrderItems((prevItems) => [...prevItems, newReagent]);
    };

    return {
        orderItems,
        deleteReagent,
        editReagent,
        addReagent,
        setOrderItems,
    };
};
