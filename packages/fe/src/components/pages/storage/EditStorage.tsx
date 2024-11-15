import { useRef } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { theme } from "theme";

import { useStorage } from "hooks/useStorage";

const textfieldStyle = { width: "200px" };
const button = { width: "250px" };
const boxStyle = { display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" };
const errorStyle = { color: theme.palette.error.main };
const successStyle = { color: theme.palette.success.main };

type EditStorageFormProps = {
    onClose: () => void;
};

export const StorageEditForm = ({ onClose }: EditStorageFormProps) => {
    const refs = {
        name: useRef<HTMLInputElement>(null),
        room: useRef<HTMLInputElement>(null),
        description: useRef<HTMLInputElement>(null),
    };

    const { roomError, nameError, handleEdit, confirmMessage, errorMessage } = useStorage(refs);

    return (
        <Box component="form" noValidate autoComplete="off" sx={boxStyle}>
            {confirmMessage && (
                <Typography sx={successStyle}>Storage was edited successfully</Typography>
            )}
            {errorMessage && <Typography sx={errorStyle}>An error occurred</Typography>}
            <TextField
                label="Room"
                name="room"
                inputRef={refs.room}
                error={!!roomError}
                helperText={roomError}
                margin="normal"
                sx={textfieldStyle}
                required={true}
            />
            <TextField
                label="Name"
                name="name"
                inputRef={refs.name}
                error={!!nameError}
                helperText={nameError}
                margin="normal"
                sx={textfieldStyle}
                required={true}
            />
            <TextField
                label="Description"
                name="description"
                inputRef={refs.description}
                margin="normal"
                sx={textfieldStyle}
            />
            <Box sx={boxStyle}>
                <Button sx={button} variant="contained" color="primary" onClick={handleEdit}>
                    Edit Storage
                </Button>
                <Button sx={button} variant="contained" color="primary" onClick={onClose}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};
