import { Box, Button } from "@mui/material";

import { createModal } from "./createModal";
import { removeResolve } from "./store";

export function ModalExample() {
    const handleModal = async () => {
        try {
            const result = await createModal({
                title: "ეთანხმებით მოსაზრებას",
                message: "ეთანხმებით თუ არა მოსაზრებას, რომ რიკი რიკი გოუდის?",
                labels: [{ ok: "კარგი" }, { cancel: "გამორთვა" }],
            });

            // eslint-disable-next-line no-console
            console.log("Resolved with:", result);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log("Rejected with:", err);
        } finally {
            removeResolve();
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
