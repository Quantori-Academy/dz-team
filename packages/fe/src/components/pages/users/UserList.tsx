import { Alert, Box, Snackbar, Typography } from "@mui/material";
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

    const { handleCloseSnackbar, openSnackbar, users } = useUserForm({});

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
            <Grid rows={users} headers={headers} />
        </Box>
    );
};
