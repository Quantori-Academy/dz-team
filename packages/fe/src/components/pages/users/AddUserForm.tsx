import { Alert, Box, Button, MenuItem, Snackbar, TextField } from "@mui/material";

import { useUserForm } from "hooks/useUserForm";

const roles = ["admin", "researcher", "procurementOfficer"];

const textfieldStyle = {
    width: "200px",
    height: "70px",
};

const boxStyle = { display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" };
const input = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexDirection: { xs: "column", sm: "row" },
};

interface AddUserFormProps {
    onClose?: () => void;
}

export const AddUserForm = ({ onClose }: AddUserFormProps) => {
    const {
        refs,
        usernameError,
        firstNameError,
        lastNameError,
        emailError,
        passwordError,
        confirmPasswordError,
        roleError,
        handleSubmit,
        notification,
        handleClose,
    } = useUserForm();

    return (
        <Box component="form" noValidate autoComplete="off" sx={boxStyle}>
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity={notification.type}>
                    {notification.message}
                </Alert>
            </Snackbar>
            <Box sx={input}>
                <TextField
                    label="Username"
                    inputRef={refs.username}
                    error={!!usernameError}
                    helperText={usernameError}
                    margin="normal"
                    sx={textfieldStyle}
                    required
                />
                <TextField
                    label="First Name"
                    inputRef={refs.firstName}
                    error={!!firstNameError}
                    helperText={firstNameError}
                    margin="normal"
                    sx={textfieldStyle}
                    required
                />
            </Box>
            <Box sx={input}>
                <TextField
                    label="Last Name"
                    inputRef={refs.lastName}
                    error={!!lastNameError}
                    helperText={lastNameError}
                    margin="normal"
                    sx={textfieldStyle}
                    required
                />
                <TextField
                    label="Email"
                    inputRef={refs.email}
                    error={!!emailError}
                    helperText={emailError}
                    margin="normal"
                    sx={textfieldStyle}
                    required
                    type="email"
                />
            </Box>
            <Box sx={input}>
                <TextField
                    label="Password"
                    type="password"
                    inputRef={refs.password}
                    error={!!passwordError}
                    helperText={passwordError}
                    margin="normal"
                    sx={textfieldStyle}
                    required
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    inputRef={refs.confirmPassword}
                    error={!!confirmPasswordError}
                    helperText={confirmPasswordError}
                    margin="normal"
                    sx={textfieldStyle}
                    required
                />
            </Box>
            <TextField
                select
                label="Role"
                inputRef={refs.role}
                error={!!roleError}
                helperText={roleError}
                margin="normal"
                defaultValue=""
                sx={textfieldStyle}
                required
            >
                {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                        {role}
                    </MenuItem>
                ))}
            </TextField>
            <Box sx={boxStyle}>
                <Button sx={{ width: "250px" }} variant="contained" onClick={handleSubmit}>
                    Save User
                </Button>
                <Button sx={{ width: "250px" }} variant="contained" onClick={onClose}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};
