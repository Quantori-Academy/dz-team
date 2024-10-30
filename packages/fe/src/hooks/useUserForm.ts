import { useState } from "react";

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

export type UserFormData = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
};

export const useUserForm = () => {
    const [formData, setFormData] = useState<UserFormData>({
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

        if (!formData.username) newErrors.username = "Username is required.";
        else if (formData.username.length > 50)
            newErrors.username = "Username must not exceed 50 characters.";

        if (!formData.firstName) newErrors.firstName = "First name is required.";
        if (!formData.lastName) newErrors.lastName = "Last name is required.";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) newErrors.email = "Email is required.";
        else if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format.";

        if (!formData.password) newErrors.password = "Password is required.";
        else if (formData.password.length < 8)
            newErrors.password = "Password must be at least 8 characters long.";

        if (formData.confirmPassword !== formData.password)
            newErrors.confirmPassword = "Passwords do not match.";
        if (!formData.role) newErrors.role = "Role is required.";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            addNewUserEvent(formData);
            addUserFx(formData);
            resetForm();
        }
    };

    const resetForm = () => {
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
    };

    return {
        formData,
        errors,
        handleChange,
        handleSubmit,
        resetForm,
    };
};
