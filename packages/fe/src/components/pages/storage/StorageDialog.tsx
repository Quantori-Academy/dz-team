import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useUnit } from "effector-react";
import { theme } from "theme";

import { $detailedStorage, deleteStorageFx } from "stores/storage";

type AddUserFormProps = {
    onClose: () => void;
};

const successStyle = {
    position: "absolute",
    top: "0",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "white",
    color: theme.palette.success.main,
    padding: "16px",
    borderRadius: "8px",
    width: "100%",
    textAlign: "center",
    zIndex: 1000,
};
const errorStyle = {
    position: "absolute",
    top: "0",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "white",
    color: theme.palette.error.main,
    padding: "16px",
    borderRadius: "8px",
    width: "100%",
    textAlign: "center",
    zIndex: 1000,
};

const button = { width: "150px" };
const boxStyle = { display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" };
export const StorageDialog = ({ onClose }: AddUserFormProps) => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [reagentsLength, setReagentsLength] = useState(false);
    const detailedStorage = useUnit($detailedStorage);
    const id = detailedStorage.id;
    const storageReagents = detailedStorage?.reagents?.length;

    const handleDeleteStorage = async (id: string) => {
        if (storageReagents && storageReagents > 0) {
            setReagentsLength(true);
            setTimeout(() => {
                onClose();
            }, 1500);

            return;
        }
        try {
            await deleteStorageFx(id);
            setSuccess(true);
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (_error) {
            setTimeout(() => {
                onClose();
                setError(true);
            }, 1500);
        }
    };

    return (
        <Box sx={boxStyle}>
            <Typography>Are You Sure You want to Delete This Storage?</Typography>
            <Button
                sx={button}
                variant="contained"
                color="primary"
                onClick={() => handleDeleteStorage(id)}
            >
                Delete
            </Button>
            <Button sx={button} variant="contained" color="primary" onClick={onClose}>
                Cancel
            </Button>
            {success && (
                <Typography sx={successStyle}>Storage was deleted successfully.</Typography>
            )}
            {error && (
                <Typography sx={errorStyle}>Failed to delete storage. Please try again.</Typography>
            )}
            {reagentsLength && (
                <Typography sx={errorStyle}>This storage Can not be deleted</Typography>
            )}
        </Box>
    );
};
