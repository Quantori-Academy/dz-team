import { Box, Button, Typography } from "@mui/material";

import { useUserForm } from "hooks/useUserForm";

const boxStyle = {
    displey: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
};
export const ConfirmMessage = ({
    id,
    onClose,
    setNotification,
}: {
    id: string;
    onClose: () => void;
    setNotification: (notification: {
        open: boolean;
        message: string;
        type: "error" | "success";
    }) => void;
}) => {
    const { handleDeleteClick } = useUserForm({});

    const handleDelete = async () => {
        try {
            await handleDeleteClick(id);
            setNotification({
                open: true,
                message: "User deleted successfully!",
                type: "success",
            });
        } catch (_error) {
            setNotification({
                open: true,
                message: "Failed to delete the user.",
                type: "error",
            });
        } finally {
            onClose();
        }
    };

    return (
        <Box sx={boxStyle}>
            <Typography sx={{ p: 2 }}>Are you sure you want to delete this user?</Typography>
            <Box sx={boxStyle} display="flex" justifyContent="flex-end">
                <Button onClick={onClose} color="primary" variant="outlined">
                    No
                </Button>
                <Button onClick={handleDelete} color="primary" variant="contained">
                    Yes
                </Button>
            </Box>
        </Box>
    );
};
