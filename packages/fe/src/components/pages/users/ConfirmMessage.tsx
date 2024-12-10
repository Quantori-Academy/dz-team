import { toast } from "react-toastify";
import { Box, Button, Typography } from "@mui/material";

import { removeModal } from "components/modal/store";
import { deleteUserFx } from "stores/users";
import { wait } from "utils";

const boxStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
};
export const ConfirmMessage = ({ id, onClose }: { id: string; onClose: () => void }) => {
    const handleDeleteClick = async (id: string) => {
        try {
            await deleteUserFx(id);
            toast.success("User deleted successfully!");
            wait(500);
            removeModal();
        } catch (_error) {
            wait(500);
            removeModal();
        }
    };

    return (
        <Box sx={boxStyle}>
            <Typography sx={{ p: 2 }}>Are you sure you want to delete this user?</Typography>
            <Box sx={{ gap: 2 }} display="flex" justifyContent="flex-end">
                <Button onClick={onClose} color="primary" variant="outlined">
                    No
                </Button>
                <Button onClick={() => handleDeleteClick(id)} color="primary" variant="contained">
                    Yes
                </Button>
            </Box>
        </Box>
    );
};
