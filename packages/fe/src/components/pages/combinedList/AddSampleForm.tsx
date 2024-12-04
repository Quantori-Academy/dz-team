import { useRef, useState } from "react";
import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { useGate, useUnit } from "effector-react";

import { useSample } from "hooks/useSampleForm";
import { CombinedList } from "shared/generated/zod/modelSchema/CombinedListSchema";
import { $combinedList, CombinedListGate } from "stores/combinedList";
import { $storageList, StorageGate } from "stores/storage";

type AddSFormProps = {
    onClose: () => void;
};

const buttonBoxStyle = { display: "flex", justifyContent: "center", gap: "25px" };

export const AddSampleForm = ({ onClose }: AddSFormProps) => {
    const name = useRef<HTMLInputElement>(null);
    const structure = useRef<HTMLInputElement>(null);
    const description = useRef<HTMLInputElement>(null);
    const quantity = useRef<HTMLInputElement>(null);
    const quantityLeft = useRef<HTMLInputElement>(null);
    const expirationDate = useRef<HTMLInputElement>(null);

    const [quantityUnit, setQuantityUnit] = useState("ml");
    const [selectedStorage, setSelectedStorage] = useState<{ id: string; name: string } | null>(
        null,
    );
    const [selectedReagentsAndSamples, setSelectedReagentsAndSamples] = useState<string[]>([]);

    //TODO
    useGate(StorageGate);
    useGate(CombinedListGate);
    const storageList = useUnit($storageList);
    const combinedList = useUnit($combinedList);

    const uniqueCombinedList = combinedList.reduce<CombinedList[]>((acc, item) => {
        // Check if the name or ID already exists in the accumulator
        if (!acc.some((existingItem) => existingItem.name === item.name)) {
            acc.push(item);
        }
        return acc;
    }, []);
    const { nameError, storageIdError, confirmMessage, errorMessage, handleSubmit } = useSample({
        name,
        structure,
        description,
        quantity,
        quantityLeft,
        reagentsAndSamplesUsed: selectedReagentsAndSamples,
        expirationDate,
        storageLocation: { current: { value: selectedStorage?.name || "" } },
        storageId: { current: { value: selectedStorage?.id || "" } },
        quantityUnit,
    });

    return (
        <Box sx={{ maxWidth: "600px" }}>
            {confirmMessage && (
                <Typography sx={(theme) => ({ color: theme.palette.success.main })}>
                    Sample Was Added Successfully
                </Typography>
            )}
            {errorMessage && (
                <Typography sx={(theme) => ({ color: theme.palette.error.main })}>
                    An Error Occurred
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
            <FormControl fullWidth margin="normal" required>
                <InputLabel>Quantity Unit</InputLabel>
                <Select value={quantityUnit} onChange={(e) => setQuantityUnit(e.target.value)}>
                    <MenuItem value="ml">ml</MenuItem>
                    <MenuItem value="l">l</MenuItem>
                    <MenuItem value="g">g</MenuItem>
                </Select>
            </FormControl>
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
            <Autocomplete
                multiple
                options={uniqueCombinedList}
                getOptionLabel={(option) => option.name || "Unnamed Item"}
                onChange={(_event, value) =>
                    setSelectedReagentsAndSamples(value.map((item) => item.name || "Unnamed Item"))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Reagents and Samples"
                        placeholder="Select reagents or samples"
                        fullWidth
                        margin="normal"
                    />
                )}
            />
            <Autocomplete
                options={storageList}
                getOptionLabel={(option) => `${option.name} (${option.room})`}
                onChange={(_event, value) => setSelectedStorage(value)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Storage"
                        placeholder="Select storage"
                        error={!!storageIdError}
                        helperText={storageIdError}
                        margin="normal"
                        required
                    />
                )}
                fullWidth
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
