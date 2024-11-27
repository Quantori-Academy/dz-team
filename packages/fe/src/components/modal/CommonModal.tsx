import { PropsWithChildren, useState } from "react";
import { Box, Button, Dialog, Typography } from "@mui/material";

type Props = {
    isOpen: boolean;
    title?: string;
    onSubmit: (value?: unknown) => void | null;
    onCancel: (reason?: unknown) => void | null;
    submitLabel?: string;
    cancelLabel?: string;
};

export const CommonModal = ({
    isOpen,
    title,
    onSubmit,
    onCancel,
    submitLabel = "Submit",
    cancelLabel = "Cancel",
    children,
}: PropsWithChildren<Props>) => {
    const [, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <Box sx={{ p: "18px" }}>
                <Typography variant="h5">{title}</Typography>
                {typeof children === "string" ? (
                    <Typography variant="body1" sx={{ my: "20px" }}>
                        {children}
                    </Typography>
                ) : (
                    <Box sx={{ my: "20px" }}>{children}</Box>
                )}
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <Button variant="contained" onClick={onSubmit}>
                        {submitLabel}
                    </Button>
                    <Button variant="outlined" onClick={onCancel}>
                        {cancelLabel}
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};
