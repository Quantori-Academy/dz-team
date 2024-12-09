import { useState } from "react";
import { toast } from "react-toastify";

import { CreateOrderReagent } from "api/order/contract";

export const useReagents = () => {
    const [orderItems, setOrderItems] = useState<CreateOrderReagent[]>([]);

    const deleteReagent = (reagentToDelete: CreateOrderReagent) => {
        if (reagentToDelete) {
            setOrderItems((prevReagents) =>
                prevReagents.filter((reagent) => reagent.id !== reagentToDelete.id),
            );
        } else {
            toast.error("No reagent selected for deletion.");
        }
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
