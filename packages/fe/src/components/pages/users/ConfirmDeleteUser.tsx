import { Button, Typography } from "@mui/material";

type OnCloseProp = {
    onClose: () => void;
    onConfirm: () => void;
};

export const ConfirmDeleteUser = ({ onClose, onConfirm }: OnCloseProp) => {
    return (
        <>
            <Typography>Are You Sure You Want To delete This User?</Typography>
            <Button onClick={onConfirm}>Delete</Button>
            <Button onClick={onClose}>Cancel</Button>
        </>
    );
};
