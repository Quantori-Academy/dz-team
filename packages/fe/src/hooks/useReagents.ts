import { useState } from "react";
import { toast } from "react-toastify";

import { CreateOrderReagent } from "api/orderDetails/contract";

export const useReagents = () => {
    const [reagents, setReagents] = useState<CreateOrderReagent[]>([]);
    const [basket, setBasket] = useState<{ reagent: CreateOrderReagent }[]>([]);

    const deleteReagent = (reagentToDelete: CreateOrderReagent) => {
        if (reagentToDelete) {
            setReagents((prevReagents) =>
                prevReagents.filter((reagent) => reagent.id !== reagentToDelete.id),
            );
            setBasket((prevBasket) =>
                prevBasket.filter((item) => item.reagent.id !== reagentToDelete.id),
            );
        } else {
            toast.error("No reagent selected for deletion.");
        }
    };

    const editReagent = (updatedReagent: CreateOrderReagent) => {
        setReagents((prevReagents) =>
            prevReagents.map((reagent) =>
                reagent.id === updatedReagent.id ? updatedReagent : reagent,
            ),
        );
        setBasket((prevBasket) =>
            prevBasket.map((item) =>
                item.reagent.id === updatedReagent.id ? { reagent: updatedReagent } : item,
            ),
        );
    };

    return {
        reagents,
        basket,
        deleteReagent,
        editReagent,
        setReagents,
        setBasket,
    };
};
