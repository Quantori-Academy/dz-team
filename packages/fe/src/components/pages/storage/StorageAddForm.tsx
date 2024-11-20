import { useRef } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { theme } from "theme";

import { useStorage } from "hooks/useStorage";

const textfieldStyle = { width: "200px" };
const button = { width: "250px" };
const boxStyle = { display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" };
const errorStyle = { backgroundColor: "white", color: theme.palette.error.main };
const successStyle = { color: theme.palette.success.main };

type AddStorageFormProps = {
    onClose: () => void;
};
export const StorageAddForm = ({ onClose }: AddStorageFormProps) => {
    const name = useRef<HTMLInputElement>(null);
    const room = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLInputElement>(null);

    const { roomError, nameError, handleSubmit, confirmMessage, errorMessage } = useStorage({
        name,
        room,
        description,
    });

    return (
        <Box component="form" noValidate autoComplete="off" sx={boxStyle}>
            {confirmMessage && (
                <Typography sx={successStyle}>Storage Was Added Successfully</Typography>
            )}
            {errorMessage && <Typography sx={errorStyle}>Occured Error</Typography>}
            <TextField
                label="Room"
                name="room"
                inputRef={room}
                error={!!roomError}
                helperText={roomError}
                margin="normal"
                sx={textfieldStyle}
                required={true}
            />
            <TextField
                label="Name"
                name="name"
                error={!!nameError}
                helperText={nameError}
                inputRef={name}
                margin="normal"
                sx={textfieldStyle}
                required={true}
            />
            <TextField
                label="Description"
                name="Description"
                inputRef={description}
                margin="normal"
                sx={textfieldStyle}
            />
            <Box sx={boxStyle}>
                <Button sx={button} variant="contained" color="primary" onClick={handleSubmit}>
                    Save Storage
                </Button>
                <Button sx={button} variant="contained" color="primary" onClick={onClose}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};
