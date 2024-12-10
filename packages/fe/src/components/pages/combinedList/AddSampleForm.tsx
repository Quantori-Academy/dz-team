import { useState } from "react";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
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
    const [unit, setUnit] = useState("");
    const [selectedStorage, setSelectedStorage] = useState<{ id: string; name: string } | null>(
        null,
    );
    const [selectedReagentsAndSamples, setSelectedReagentsAndSamples] = useState<string[]>([]);

    useGate(StorageGate);
    useGate(CombinedListGate);

    const { storageList, combinedList } = useUnit({
        storageList: $storageList,
        combinedList: $combinedList,
    });

    const uniqueCombinedList = combinedList.reduce<CombinedList[]>((acc, item) => {
        // Check if the name already exists in the list
        if (!acc.some((existingItem) => existingItem.name === item.name)) {
            acc.push(item);
        }
        return acc;
    }, []);

    const {
        nameRef,
        structureRef,
        descriptionRef,
        quantityRef,
        nameError,
        storageIdError,
        handleSubmit,
    } = useSample({
        unit,
        reagentsAndSamplesUsed: selectedReagentsAndSamples,
        selectedStorage,
    });

    return (
        <Box sx={{ maxWidth: "600px" }}>
            <TextField
                label="Name"
                inputRef={nameRef}
                error={!!nameError}
                helperText={nameError}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Structure (Chemical)"
                inputRef={structureRef}
                fullWidth
                margin="normal"
                required
            />
            <TextField label="Description" inputRef={descriptionRef} fullWidth margin="normal" />
            <Autocomplete
                freeSolo
                options={["ml", "l", "g"]}
                value={unit}
                onChange={(_, newValue) => setUnit(newValue || "")}
                onInputChange={(_, newValue) => setUnit(newValue)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Unit"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                    />
                )}
            />
            <TextField
                label="Quantity"
                inputRef={quantityRef}
                type="number"
                fullWidth
                margin="normal"
            />
            <Autocomplete
                multiple
                options={uniqueCombinedList}
                getOptionLabel={(option) => option.name || "Unnamed Item"}
                filterSelectedOptions
                filterOptions={(options, state) =>
                    options.filter((option) =>
                        option.name?.toLowerCase().includes(state.inputValue.toLowerCase()),
                    )
                }
                onChange={(_event, value) => {
                    const selectedIds = value.map((item) => item.id);
                    setSelectedReagentsAndSamples(selectedIds);
                }}
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
                filterOptions={(options, { inputValue }) =>
                    options.filter((option) =>
                        option.name.toLowerCase().includes(inputValue.toLowerCase()),
                    )
                }
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
