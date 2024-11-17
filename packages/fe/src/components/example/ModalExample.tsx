import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";

export function ModalExample() {
    const [count, setCount] = useState(0);

    const increment = async () => {
        try {
            await createModal({
                name: "counter_modal",
                title: "Make count higher",
                message: "Are you sure you want to add 1 to the counter?",
                labels: { ok: "Yes", cancel: "No" },
            });

            setCount((prev) => prev + 1);
            removeModal();
        } catch (_) {
            setCount((prev) => prev);
            removeModal();
        }
    };

    return (
        <Box>
            <Typography>Current state: {count}</Typography>
            <Button variant="outlined" onClick={() => void increment()}>
                Add +1 to the count
            </Button>
        </Box>
    );
}
