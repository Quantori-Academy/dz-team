import { useState } from "react";
import { Alert, Box, Snackbar, Typography } from "@mui/material";
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
    const [openSnackbar, setOpenSnackbar] = useState(false);
    useGate(UsersGate);
    const users = useUnit($UsersList);

    const handleDeleteClick = (id: string) => {
        const user = users.find((user) => user.id === id);
        if (user?.role === "admin") {
            setOpenSnackbar(true);
            return;
        }
        deleteUserFx(id);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={boxStyles}>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: "100%" }}>
                    You can not delete an admin!
                </Alert>
            </Snackbar>
            <Typography variant="h5">User List</Typography>
            <Grid rows={users} headers={headers} handleDeleteClick={handleDeleteClick} />
        </Box>
    );
};
