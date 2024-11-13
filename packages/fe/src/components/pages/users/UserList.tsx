import { Box, Typography } from "@mui/material";
import { useGate } from "effector-react";

import { useUserForm } from "hooks/useUserForm";
import { UsersGate } from "stores/users";

import { Grid } from "../../dataGrid/Grid";

const headers = [
    { field: "username", headerName: "User Name", width: 150 },
    { field: "email", headerName: "Email", width: 170 },
    { field: "role", headerName: "Role", width: 170 },
    { field: "lastLoginDate", headerName: "Last login date", width: 170 },
];

const boxStyles = {
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
};

export const UserList = () => {
    useGate(UsersGate);

    const { users } = useUserForm({});

    return (
        <Box sx={boxStyles}>
            <Typography variant="h5">User List</Typography>
            <Grid rows={users} headers={headers} />
        </Box>
    );
};
