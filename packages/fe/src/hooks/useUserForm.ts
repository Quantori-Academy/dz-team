import { useState } from "react";

import { addUserFx } from "stores/users";

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

        if (formData.username.length > 50)
            newErrors.username = "Username must not exceed 50 characters.";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format.";

        if (formData.password.length < 8)
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
            addUserFx(formData);
            setErrors({});
        }
        refs.username.current!.value = "";
        refs.firstName.current!.value = "";
        refs.lastName.current!.value = "";
        refs.email.current!.value = "";
        refs.password.current!.value = "";
        refs.confirmPassword.current!.value = "";
        refs.role.current!.value = "";
    };

    return {
        errors,
        handleSubmit,
    };
};
