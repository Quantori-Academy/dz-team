import { Box, Button, Dialog, Typography } from "@mui/material";

import { LabelsType } from "./store";

interface Props {
    isOpen: boolean;
    resolve: (value?: unknown) => void | null;
    reject: (reason?: unknown) => void | null;
    title: string;
    message: string | React.ReactNode;
    labels: LabelsType;
    hideModalButtons?: boolean;
}

export function Modal({
    isOpen,
    message,
    title,
    labels,
    resolve,
    reject,
    hideModalButtons = false,
}: Props) {
    return (
        <Dialog open={isOpen} onClose={reject}>
            <Box sx={{ p: "18px" }}>
                <Typography variant="h5">{title}</Typography>
                {typeof message === "string" ? (
                    <Typography variant="body1" sx={{ my: "20px" }}>
                        {message}
                    </Typography>
                ) : (
                    <Box sx={{ my: "20px" }}>{message}</Box>
                )}
                {hideModalButtons && (
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        <Button variant="contained" onClick={resolve}>
                            {labels.ok}
                        </Button>
                        <Button variant="outlined" onClick={reject}>
                            {labels.cancel}
                        </Button>
                    </Box>
                )}
            </Box>
        </Dialog>
    );
}
