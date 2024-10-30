import { Box, Button, MenuItem, TextField } from "@mui/material";

import { useUserForm } from "hooks/useUserForm";

export const AddUserForm = () => {
    const roles = ["admin", "researcher", "procurementOfficer"];

    const { formData, errors, handleChange, handleSubmit } = useUserForm();

    const textfieldStyle = {
        width: "400px",
    };
    const BoxStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };

    return (
        <Box component="form" noValidate autoComplete="off" sx={BoxStyle}>
            <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                margin="normal"
                sx={textfieldStyle}
            />
            <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                margin="normal"
                sx={textfieldStyle}
            />
            <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                margin="normal"
                sx={textfieldStyle}
            />
            <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
                sx={textfieldStyle}
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                margin="normal"
                sx={textfieldStyle}
            />
            <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                margin="normal"
                sx={textfieldStyle}
            />
            <TextField
                select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                error={!!errors.role}
                helperText={errors.role}
                margin="normal"
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
