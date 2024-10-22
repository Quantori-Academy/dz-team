import { Box, Typography } from "@mui/material";
import { useGate, useUnit } from "effector-react";

import { $UserList, UsersGate } from "stores/users";

import { TableGrid } from "../tableGrid/TableGrid";

const headers = [
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 200 },
    { field: "lastLoginDate", headerName: "Last login date", width: 200 },
];

export const UserList = () => {
    useGate(UsersGate);
    const users = useUnit($UserList);
    return (
        <Box sx={{ padding: "40px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <Typography variant="h5">User List</Typography>
            <TableGrid data={users} headers={headers} />
        </Box>
    );
};
