import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Drawer, IconButton, TextField, Typography } from "@mui/material";

import { CreateOrderReagent } from "api/orderDetails/contract";

type FieldConfig = {
    headerName: string;
    field: string;
    type?: string;
    required?: boolean;
    disabled?: boolean;
};

type OrderReagentDetailsProps = {
    selectedReagent: CreateOrderReagent | null;
    onAddToOrder: () => void;
    onClose: () => void;
    open: boolean;
    fields: FieldConfig[];
};
export function OrderReagentDetail({
    selectedReagent,
    onAddToOrder,
    onClose,
    open,
    fields,
}: OrderReagentDetailsProps) {
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
                                defaultValue={
                                    (selectedReagent as Partial<CreateOrderReagent>)[
                                        field.field as keyof CreateOrderReagent
                                    ]
                                }
                                fullWidth
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                        ))}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onAddToOrder}
                            sx={{ mt: 3, width: "100%" }}
                        >
                            Add to Order
                        </Button>
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
