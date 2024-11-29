import { Box, Button, Dialog, Typography } from "@mui/material";

import { buttonClick } from "./store";

interface Props {
    isOpen: boolean;
    title?: string;
    message?: string | React.ReactNode;
    labels?: { ok: string; cancel: string };
}

export function Modal({ isOpen, message, title, labels }: Props) {
    return (
        <Dialog open={isOpen} onClose={() => buttonClick(false)}>
            <Box sx={{ p: "18px" }}>
                <Typography variant="h5">{title}</Typography>
                {typeof message === "string" ? (
                    <Typography variant="body1" sx={{ my: "20px" }}>
                        {message}
                    </Typography>
                ) : (
                    <Box sx={{ my: "20px" }}>{message}</Box>
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
                    {labels?.ok && (
                        <Button variant="contained" onClick={() => buttonClick(true)}>
                            {labels.ok}
                        </Button>
                    )}
                    {labels?.cancel && (
                        <Button variant="outlined" onClick={() => buttonClick(false)}>
                            {labels.cancel}
                        </Button>
                    )}
                </Box>
            </Box>
        </Dialog>
    );
}
