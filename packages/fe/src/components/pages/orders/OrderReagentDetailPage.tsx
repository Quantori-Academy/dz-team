import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Drawer, IconButton, TextField, Typography } from "@mui/material";

import { CreateOrderReagent } from "api/orderDetails/contract";

type FieldConfig = {
    headerName: string;
    field: string;
    type?: string;
    required?: boolean;
    disabled?: boolean;
    editable?: boolean;
};

type OrderReagentDetailsProps = {
    selectedReagent: CreateOrderReagent | null;
    onClose: () => void;
    open: boolean;
    fields: FieldConfig[];
    onDeleteReagent: () => void;
    onEditReagent: (updatedReagent: CreateOrderReagent) => void;
};
export function OrderReagentDetail({
    selectedReagent,
    onClose,
    open,
    fields,
    onDeleteReagent,
    onEditReagent,
}: OrderReagentDetailsProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedReagent, setEditedReagent] = useState<CreateOrderReagent | null>(null);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedReagent(selectedReagent);
    };

    const handleFieldChange = (field: string, value: string) => {
        if (editedReagent) {
            setEditedReagent((prev) => ({
                ...prev!,
                [field]: value,
            }));
        }
    };

    const handleSaveClick = () => {
        if (editedReagent) {
            onEditReagent(editedReagent);
        }
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedReagent(null);
    };
    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 400, p: 3 }}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                {selectedReagent ? (
                    <Box>
                        {fields.map((field, index) => (
                            <TextField
                                key={index}
                                label={field.headerName}
                                type="text"
                                value={
                                    isEditing
                                        ? (editedReagent as Partial<CreateOrderReagent>)[
                                              field.field as keyof CreateOrderReagent
                                          ] || ""
                                        : (selectedReagent as Partial<CreateOrderReagent>)[
                                              field.field as keyof CreateOrderReagent
                                          ]
                                }
                                onChange={(e) =>
                                    isEditing && handleFieldChange(field.field, e.target.value)
                                }
                                fullWidth
                                variant="outlined"
                                sx={{ mb: 2 }}
                                disabled={!field.editable || !isEditing}
                            />
                        ))}
                        {!isEditing ? (
                            <>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleEditClick}
                                    sx={{ flex: 1, mr: 2 }}
                                >
                                    Edit Reagent
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={onDeleteReagent}
                                    sx={{ flex: 1 }}
                                >
                                    Delete Reagent
                                </Button>
                            </>
                        ) : (
                            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSaveClick}
                                    sx={{ flex: 1 }}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleCancelEdit}
                                    sx={{ flex: 1 }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        )}
                    </Box>
                ) : (
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        No reagent selected.
                    </Typography>
                )}
            </Box>
        </Drawer>
    );
}
