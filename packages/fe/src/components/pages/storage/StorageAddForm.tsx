import { useRef } from "react";
import { Box, Button, TextField } from "@mui/material";

import { useStorage } from "hooks/useStorage";

const textfieldStyle = { width: "200px" };
const button = { width: "250px" };
const boxStyle = { display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" };

type AddStorageFormProps = {
    onClose: () => void;
};
export const StorageAddForm = ({ onClose }: AddStorageFormProps) => {
    const refs = {
        name: useRef<HTMLInputElement>(null),
        room: useRef<HTMLInputElement>(null),
        description: useRef<HTMLInputElement>(null),
    };

    const { roomError, nameError, handleSubmit } = useStorage(refs);

    return (
        <Box component="form" noValidate autoComplete="off" sx={boxStyle}>
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
                error={!!nameError}
                helperText={nameError}
                inputRef={refs.name}
                margin="normal"
                sx={textfieldStyle}
                required={true}
            />
            <TextField
                label="Description"
                name="Description"
                inputRef={refs.description}
                margin="normal"
                sx={textfieldStyle}
                required={true}
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
