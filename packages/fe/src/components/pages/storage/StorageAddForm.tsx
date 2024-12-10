import { useRef } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import { useStorage } from "hooks/useStorage";

const boxStyle = { display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" };

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
                <Typography
                    sx={(theme) => ({
                        color: theme.palette.success.main,
                    })}
                >
                    Storage Was Added Successfully
                </Typography>
            )}
            {errorMessage && (
                <Typography
                    sx={(theme) => ({
                        color: theme.palette.error.main,
                    })}
                >
                    Occured Error
                </Typography>
            )}
            <TextField
                label="Room"
                name="room"
                inputRef={room}
                error={!!roomError}
                helperText={roomError}
                margin="normal"
                sx={{ width: "200px" }}
                required={true}
            />
            <TextField
                label="Name"
                name="name"
                error={!!nameError}
                helperText={nameError}
                inputRef={name}
                margin="normal"
                sx={{ width: "200px" }}
                required={true}
            />
            <TextField
                label="Description"
                name="Description"
                inputRef={description}
                margin="normal"
                sx={{ width: "200px" }}
            />
            <Box sx={boxStyle}>
                <Button
                    sx={{ width: "250px" }}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Save Storage
                </Button>
                <Button
                    sx={{ width: "250px" }}
                    variant="contained"
                    color="primary"
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};
