import { Box, Typography } from "@mui/material";
import { useGate, useUnit } from "effector-react";

import { $UsersList, UsersGate } from "stores/users";

import { Grid } from "../../dataGrid/Grid";

const headers = [
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 200 },
    { field: "lastLoginDate", headerName: "Last login date", width: 200 },
];

const boxStyles = {
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
};

export const UserList = () => {
    useGate(UsersGate);
    const users = useUnit($UsersList);
    return (
        <Box sx={boxStyles}>
            <Typography variant="h5">User List</Typography>
            <Grid rows={users} headers={headers} />
        </Box>
    );
};
