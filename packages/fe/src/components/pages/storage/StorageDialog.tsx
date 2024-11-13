import { Box, Button, Typography } from "@mui/material";
import { useUnit } from "effector-react";

import { $detailedStorage, deleteStorageFx } from "stores/storage";

type AddUserFormProps = {
    onClose: () => void;
};

const button = { width: "150px" };
const boxStyle = { display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" };
export const StorageDialog = ({ onClose }: AddUserFormProps) => {
    const detailedStorage = useUnit($detailedStorage);

    const id = detailedStorage.id;

    const handleDeleteStorage = (id: string) => {
        deleteStorageFx(id);
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
        </Box>
    );
};
