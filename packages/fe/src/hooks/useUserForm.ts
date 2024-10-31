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

export const useUserForm = (refs: { [key: string]: React.RefObject<HTMLInputElement> }) => {
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (formData: UserFormData) => {
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
        const formData: UserFormData = {
            username: refs.username.current?.value || "",
            firstName: refs.firstName.current?.value || "",
            lastName: refs.lastName.current?.value || "",
            email: refs.email.current?.value || "",
            password: refs.password.current?.value || "",
            confirmPassword: refs.confirmPassword.current?.value || "",
            role: refs.role.current?.value || "",
        };

        if (validateForm(formData)) {
            addNewUserEvent(formData);
            addUserFx(formData);
            setErrors({});
        }
    };

    return {
        errors,
        handleSubmit,
    };
};
