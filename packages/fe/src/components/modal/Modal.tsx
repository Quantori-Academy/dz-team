import { Box, Button, Dialog, Typography } from "@mui/material";

interface Props {
    isOpen: boolean;
    resolve: (value?: unknown) => void | null;
    reject: (reason?: unknown) => void | null;
    title: string;
    message: string | React.ReactNode;
    labels: [{ ok: string }, { cancel: string }];
}

export function Modal({ isOpen, message, title, labels, resolve, reject }: Props) {
    const handleResolve = () => {
        resolve();
    };
    const handleReject = () => {
        reject();
    };

    return (
        <Dialog open={isOpen} onClose={handleReject}>
            <Box sx={{ p: "18px" }}>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="body1">{message}</Typography>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    {labels.map((btn, idx) => (
                        <Button key={idx} variant="contained" onClick={handleResolve}>
                            {btn[Object.keys(btn)[0]]}
                        </Button>
                    ))}
                </Box>
            </Box>
        </Dialog>
    );
}
