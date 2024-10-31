import { useRef } from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";

import { useUserForm } from "hooks/useUserForm";

const roles = ["admin", "researcher", "procurementOfficer"];

const textfieldStyle = { width: "400px" };
const BoxStyle = { display: "flex", flexDirection: "column", alignItems: "center" };

export const AddUserForm = () => {
    const refs = {
        username: useRef<HTMLInputElement>(null),
        firstName: useRef<HTMLInputElement>(null),
        lastName: useRef<HTMLInputElement>(null),
        email: useRef<HTMLInputElement>(null),
        password: useRef<HTMLInputElement>(null),
        confirmPassword: useRef<HTMLInputElement>(null),
        role: useRef<HTMLInputElement>(null),
    };

    const { errors, handleSubmit } = useUserForm(refs);

    return (
        <Box component="form" noValidate autoComplete="off" sx={BoxStyle}>
            <TextField
                label="Username"
                name="username"
                inputRef={refs.username}
                error={!!errors.username}
                helperText={errors.username}
                margin="normal"
                sx={textfieldStyle}
            />
            <TextField
                label="First Name"
                name="firstName"
                inputRef={refs.firstName}
                error={!!errors.firstName}
                helperText={errors.firstName}
                margin="normal"
                sx={textfieldStyle}
            />
            <TextField
                label="Last Name"
                name="lastName"
                inputRef={refs.lastName}
                error={!!errors.lastName}
                helperText={errors.lastName}
                margin="normal"
                sx={textfieldStyle}
            />
            <TextField
                label="Email"
                name="email"
                inputRef={refs.email}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
                sx={textfieldStyle}
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                inputRef={refs.password}
                error={!!errors.password}
                helperText={errors.password}
                margin="normal"
                sx={textfieldStyle}
            />
            <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                inputRef={refs.confirmPassword}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                margin="normal"
                sx={textfieldStyle}
            />
            <TextField
                select
                label="Role"
                name="role"
                inputRef={refs.role}
                error={!!errors.role}
                helperText={errors.role}
                margin="normal"
                defaultValue=""
                sx={textfieldStyle}
            >
                {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                        {role}
                    </MenuItem>
                ))}
            </TextField>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Save User
            </Button>
        </Box>
    );
};
