import { Box, Button } from "@mui/material";

import { createModal } from "./createModal";

export function ModalExample() {
    const handleModal = async () => {
        // to simplify, not passing details to the create modal; just implementing open/close functionality
        const result = await createModal();

        if (result) {
            // the onClose("some value") in modal component is logging from here
            // eslint-disable-next-line no-console
            console.log(result);
        }
    };

    return (
        <Box>
            <Button variant="outlined" onClick={() => void handleModal()}>
                Open a modal
            </Button>
        </Box>
    );
}
