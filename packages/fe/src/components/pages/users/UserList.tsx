import { Box } from "@mui/material";
import { useGate } from "effector-react";

import { UsersGate } from "stores/users";

export const UserList = () => {
    useGate(UsersGate);

    return <Box />;
};
