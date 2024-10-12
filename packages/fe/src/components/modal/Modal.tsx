import { Button, Dialog, Typography } from "@mui/material";

import { removeResolve } from "./store";

// inline interfaces for test purposes yet
interface Props {
    isOpen: boolean;
    onClose: (val: unknown) => void;
}

// to simplify, just receiving open/close props and tracking only the state
export function Modal({ isOpen, onClose }: Props) {
    const closeModal = () => {
        // this should make the resolve action which (as i understood) should be dynamic as user choices
        onClose("some action");
        // cleares the store, which triggers the modal to be closed
        removeResolve();
    };

    return (
        <Dialog open={isOpen} onClose={closeModal}>
            <Typography variant="h1">TEXT</Typography>
            MESSAGE
            <Button variant="contained">btn1</Button>
            <Button variant="contained">btn2</Button>
        </Dialog>
    );
}
