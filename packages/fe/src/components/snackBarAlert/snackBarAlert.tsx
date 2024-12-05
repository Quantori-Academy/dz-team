import { Alert, Snackbar } from "@mui/material";

type SnackbarAlertProps = {
    open: boolean;
    message: string;
    severity: "success" | "error";
    onClose: () => void;
};

export const SnackbarAlert = ({ open, message, severity, onClose }: SnackbarAlertProps) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};
