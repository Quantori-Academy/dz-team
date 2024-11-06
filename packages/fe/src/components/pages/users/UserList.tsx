import { Box, Typography } from "@mui/material";
import { useGate, useUnit } from "effector-react";

import { $UsersList, deleteUserFx, UsersGate } from "stores/users";

import { Grid } from "../../userDataGrid/Grid";

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
    const users = useUnit($UsersList);

    const handleDeleteClick = (id: string) => {
        const user = users.find((user) => user.id === id);
        if (user?.role === "admin") {
            alert("You can't delete admin");
            return;
        }
        deleteUserFx(id);
    };

    return (
        <Box sx={boxStyles}>
            <Typography variant="h5">User List</Typography>
            <Grid rows={users} headers={headers} handleDeleteClick={handleDeleteClick} />
        </Box>
    );
};
