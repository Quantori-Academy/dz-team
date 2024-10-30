import { useState } from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";

import { addNewUserEvent, addUserFx } from "stores/users";

type FormErrors = {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
};

export const AddUserForm = () => {
    const roles = ["admin", "researcher", "procurementOfficer"];
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};

        if (!formData.username) {
            newErrors.username = "Username is required.";
        } else if (formData.username.length > 50) {
            newErrors.username = "Username must not exceed 50 characters.";
        }

        if (!formData.firstName) {
            newErrors.firstName = "First name is required.";
        }

        if (!formData.lastName) {
            newErrors.lastName = "Last name is required.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long.";
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        if (!formData.role) {
            newErrors.role = "Role is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            addNewUserEvent(formData);
            addUserFx(formData);
            setFormData({
                username: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                role: "",
            });
            setErrors({});
        }
    };
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
