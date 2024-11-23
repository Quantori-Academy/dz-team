import { useState } from "react";
import { useUnit } from "effector-react";

import { $UsersList, addUserFx, deleteUserFx } from "stores/users";

export type NewUser = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
};

export const useUserForm = (refs: { [key: string]: React.RefObject<HTMLInputElement> }) => {
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [firstNameError, setFirstNameError] = useState<string | null>(null);
    const [lastNameError, setLastNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
    const [roleError, setRoleError] = useState<string | null>(null);

    const users = useUnit($UsersList);

    // user delete
    const handleDeleteClick = (id: string) => {
        deleteUserFx(id);
    };

    const validateForm = (formData: NewUser) => {
        let isValid = true;

        if (formData.username.length > 50) {
            setUsernameError("Username must not exceed 50 characters.");
            isValid = false;
        } else if (!formData.username || formData.username.trim().length === 0) {
            setUsernameError("User name is required");
            isValid = false;
        }

        if (!formData.firstName || formData.firstName.trim().length === 0) {
            setFirstNameError("First Name is required.");
            isValid = false;
        }
        if (!formData.lastName || formData.lastName.trim().length === 0) {
            setLastNameError("Last Name is required.");
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setEmailError("Invalid email format.");
            isValid = false;
        }

        if ((formData.password ?? "").length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
            isValid = false;
        }

        if (formData.confirmPassword !== formData.password) {
            setConfirmPasswordError("Passwords do not match.");
            isValid = false;
        }

        if (!formData.role) {
            setRoleError("Role is required.");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = () => {
        const formData: NewUser = {
            username: refs.username.current?.value as string,
            firstName: refs.firstName.current?.value as string,
            lastName: refs.lastName.current?.value as string,
            email: refs.email.current?.value as string,
            password: refs.password.current?.value as string,
            confirmPassword: refs.confirmPassword.current?.value as string,
            role: refs.role.current?.value as "admin" | "researcher" | "procurementOfficer",
        };

        if (validateForm(formData)) {
            addUserFx(formData);
            setUsernameError(null);
            setFirstNameError(null);
            setLastNameError(null);
            setEmailError(null);
            setPasswordError(null);
            setConfirmPasswordError(null);
            setRoleError(null);
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
        usernameError,
        firstNameError,
        lastNameError,
        emailError,
        passwordError,
        confirmPasswordError,
        roleError,
        handleSubmit,
        handleDeleteClick,
        users,
    };
};
