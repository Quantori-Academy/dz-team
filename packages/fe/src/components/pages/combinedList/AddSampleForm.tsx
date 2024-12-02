import { useRef } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import { useSample } from "hooks/useSampleForm";

type AddSFormProps = {
    onClose: () => void;
};
const buttonBoxStyle = { display: "flex", justifyContent: "center", gap: "25px" };

export const AddSampleForm = ({ onClose }: AddSFormProps) => {
    const name = useRef<HTMLInputElement>(null);
    const structure = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLInputElement>(null);
    const quantityUnit = useRef<HTMLInputElement>(null);
    const quantity = useRef<HTMLInputElement>(null);
    const quantityLeft = useRef<HTMLInputElement>(null);
    const reagentsUsed = useRef<HTMLInputElement>(null);
    const expirationDate = useRef<HTMLInputElement>(null);
    const storageLocation = useRef<HTMLInputElement>(null);

    const { nameError, confirmMessage, errorMessage, handleSubmit } = useSample({
        name,
        structure,
        description,
        quantityUnit,
        quantity,
        quantityLeft,
        reagentsUsed,
        expirationDate,
        storageLocation,
    });

    return (
        <Box sx={{ maxWidth: "600px" }}>
            {confirmMessage && (
                <Typography
                    sx={(theme) => ({
                        color: theme.palette.success.main,
                    })}
                >
                    Sample Was Added Successfully
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
                label="Name"
                inputRef={name}
                error={!!nameError}
                helperText={nameError}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Structure (Chemical)"
                inputRef={structure}
                fullWidth
                margin="normal"
                required
            />
            <TextField label="Description" inputRef={description} fullWidth margin="normal" />
            <TextField
                label="Quantity Unit (e.g., ml)"
                inputRef={quantityUnit}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Quantity"
                inputRef={quantity}
                type="number"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Quantity Left"
                inputRef={quantityLeft}
                type="number"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Reagents Used (comma-separated)"
                inputRef={reagentsUsed}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Expiration Date"
                inputRef={expirationDate}
                type="date"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Storage Location (Room, Cabinet, Shelf)"
                inputRef={storageLocation}
                fullWidth
                margin="normal"
            />
            <Box sx={buttonBoxStyle}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ width: "150px" }}
                >
                    Add Sample
                </Button>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    color="primary"
                    sx={{ width: "150px" }}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};
