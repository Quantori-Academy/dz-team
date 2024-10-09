import { Box, Button, Dialog } from "@mui/material";

interface Props {
    children: React.ReactNode;
    onOk?: () => void;
    onClose?: () => void;
    onAccept?: () => void;
    onDecline?: () => void;
    isOpen: boolean;
}

export function Modal({ children, isOpen, onAccept, onClose, onDecline, onOk }: Props) {
    const handleAccept = () => {
        onAccept();
        onClose();
    };
    const handleDecline = () => {
        onDecline();
        onClose();
    };
    const handleOk = () => {
        onOk();
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} sx={{}}>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
                {onClose && (
                    <Button variant="contained" sx={{ maxWidth: "" }} onClick={onClose}>
                        Close
                    </Button>
                )}
            </Box>
            <Box sx={{ p: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>{children}</Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                    {onAccept && (
                        <Button variant="contained" onClick={handleAccept}>
                            Accept
                        </Button>
                    )}
                    {onOk && (
                        <Button variant="contained" onClick={handleOk}>
                            Ok
                        </Button>
                    )}
                    {onDecline && (
                        <Button variant="contained" onClick={handleDecline}>
                            Decline
                        </Button>
                    )}
                </Box>
            </Box>
        </Dialog>
    );
}
