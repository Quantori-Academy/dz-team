import { Box, Button, Typography } from "@mui/material";

import { useUserForm } from "hooks/useUserForm";

export const ConfirmMessage = ({
    id,
    onClose,
    setNotification,
}: {
    id: string;
    onClose: () => void;
    setNotification: (notification: { open: boolean; message: string; type: string }) => void;
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
        <Box>
            <Typography>Are you sure you want to delete this user?</Typography>
            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                <Button onClick={onClose} color="primary" variant="outlined">
                    No
                </Button>
                <Button onClick={handleDelete} color="secondary" variant="contained">
                    Yes
                </Button>
            </Box>
        </Box>
    );
};
