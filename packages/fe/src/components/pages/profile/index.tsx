import { useRef } from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { useUnit } from "effector-react";

import { useUserUpdate } from "hooks/useUserUpdate";
import { $me } from "stores/auth";

export const ProfilePage = () => {
    const currentUserInfo = useUnit($me);
    const textfieldStyle = { width: "400px" };
    const button = { width: "400px", minHeight: "56px" };
    const boxStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
    };
    const roles = ["admin", "researcher", "procurementOfficer"];
    const refs = {
        username: useRef<HTMLInputElement>(null),
        firstName: useRef<HTMLInputElement>(null),
        lastName: useRef<HTMLInputElement>(null),
        email: useRef<HTMLInputElement>(null),
        password: useRef<HTMLInputElement>(null),
        confirmPassword: useRef<HTMLInputElement>(null),
        role: useRef<HTMLInputElement>(null),
    };
    const { errors, handleSubmit } = useUserUpdate(currentUserInfo?.id ?? "123", refs);
    return (
        <Box component="form" noValidate autoComplete="off" sx={boxStyle}>
            <TextField
                label="First Name"
                name="firstName"
                inputRef={refs.firstName}
                error={!!errors.firstName}
                helperText={errors.firstName}
                margin="normal"
                sx={textfieldStyle}
                required={true}
            />
            <TextField
                label="Last Name"
                name="lastName"
                inputRef={refs.lastName}
                error={!!errors.lastName}
                helperText={errors.lastName}
                margin="normal"
                sx={textfieldStyle}
                required={true}
            />
            <TextField
                label="Email"
                name="email"
                inputRef={refs.email}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
                sx={textfieldStyle}
                required={true}
                type="email"
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
                required={true}
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
                required={true}
            >
                {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                        {role}
                    </MenuItem>
                ))}
            </TextField>
            <Button sx={button} variant="contained" color="primary" onClick={handleSubmit}>
                Save User
            </Button>
        </Box>
    );
};
