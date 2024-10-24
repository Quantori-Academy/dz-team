# Modal usage

Since there are a lot of kind of pop-ups, project has reusable modal component. And as it says: you can use it anytime from anywhere. :)

# Flow

Just call `await createModal()` function in a component and pass object with certain keys to it. It will make a Promise and simply: resolving of it means "YES" and rejecting means "NO".

```tsx
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
                labels: [{ ok: "Yes" }, { cancel: "No" }],
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
```

In addition:

-   `message` can be both: string and component, too.
-   You must call the handler function in this manner: `() => void increment()` to avoid type errors.
-   In both, resolve and reject cases, you must call `removeModal()` function in the end to delete modal from the store. (not in `finally{ ... }` block)
