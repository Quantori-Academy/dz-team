import { useRef } from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";

import { useUserForm } from "hooks/useUserForm";

const roles = ["admin", "researcher", "procurementOfficer"];

const boxStyle = { display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" };
const input = { display: "flex", alignItems: "center", gap: "10px" };
type AddUserFormProps = {
    onClose?: () => void;
};
export const AddUserForm = ({ onClose }: AddUserFormProps) => {
    const refs = {
        username: useRef<HTMLInputElement>(null),
        firstName: useRef<HTMLInputElement>(null),
        lastName: useRef<HTMLInputElement>(null),
        email: useRef<HTMLInputElement>(null),
        password: useRef<HTMLInputElement>(null),
        confirmPassword: useRef<HTMLInputElement>(null),
        role: useRef<HTMLInputElement>(null),
    };

    const {
        usernameError,
        emailError,
        passwordError,
        confirmPasswordError,
        roleError,
        firstNameError,
        lastNameError,
        handleSubmit,
    } = useUserForm(refs);

    return (
        <Box component="form" noValidate autoComplete="off" sx={boxStyle}>
            <Box sx={input}>
                <TextField
                    label="Username"
                    name="username"
                    inputRef={refs.username}
                    error={!!usernameError}
                    helperText={usernameError}
                    margin="normal"
                    sx={{ width: "200px" }}
                    required={true}
                />
                <TextField
                    label="First Name"
                    name="firstName"
                    error={!!firstNameError}
                    helperText={firstNameError}
                    inputRef={refs.firstName}
                    margin="normal"
                    sx={{ width: "200px" }}
                    required={true}
                />
            </Box>
            <Box sx={input}>
                <TextField
                    label="Last Name"
                    name="lastName"
                    error={!!lastNameError}
                    helperText={lastNameError}
                    inputRef={refs.lastName}
                    margin="normal"
                    sx={{ width: "200px" }}
                    required={true}
                />
                <TextField
                    label="Email"
                    name="email"
                    inputRef={refs.email}
                    error={!!emailError}
                    helperText={emailError}
                    margin="normal"
                    sx={{ width: "200px" }}
                    required={true}
                    type="email"
                />
            </Box>
            <Box sx={input}>
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    inputRef={refs.password}
                    error={!!passwordError}
                    helperText={passwordError}
                    margin="normal"
                    sx={{ width: "200px" }}
                    required={true}
                />
                <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    inputRef={refs.confirmPassword}
                    error={!!confirmPasswordError}
                    helperText={confirmPasswordError}
                    margin="normal"
                    sx={{ width: "200px" }}
                    required={true}
                />
            </Box>
            <TextField
                select
                label="Role"
                name="role"
                inputRef={refs.role}
                error={!!roleError}
                helperText={roleError}
                margin="normal"
                defaultValue=""
                sx={{ width: "200px" }}
                required={true}
            >
                {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                        {role}
                    </MenuItem>
                ))}
            </TextField>
            <Box sx={boxStyle}>
                <Button
                    sx={{ width: "250px" }}
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Save User
                </Button>
                <Button
                    sx={{ width: "250px" }}
                    variant="contained"
                    color="primary"
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};
