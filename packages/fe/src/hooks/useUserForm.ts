import { useRef, useState } from "react";
import { useUnit } from "effector-react";

import { NewUser } from "api/types";
import { removeModal } from "components/modal/store";
import { $usersList, addUserFx, deleteUserFx } from "stores/users";

export type NotificationTypes = {
    message: string;
    type: "error" | "success";
    open: boolean;
};

export const useUserForm = () => {
    const refs = {
        username: useRef<HTMLInputElement>(null),
        firstName: useRef<HTMLInputElement>(null),
        lastName: useRef<HTMLInputElement>(null),
        email: useRef<HTMLInputElement>(null),
        password: useRef<HTMLInputElement>(null),
        confirmPassword: useRef<HTMLInputElement>(null),
        role: useRef<HTMLInputElement>(null),
    };

    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [firstNameError, setFirstNameError] = useState<string | null>(null);
    const [lastNameError, setLastNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
    const [roleError, setRoleError] = useState<string | null>(null);

    const users = useUnit($usersList);

    const [notification, setNotification] = useState<NotificationTypes>({
        message: "",
        type: "success",
        open: false,
    });

    const handleDeleteClick = async (id: string) => {
        await deleteUserFx(id);
        setNotification({ message: "User deleted successfully!", type: "success", open: true });
    };

    const handleClose = () => setNotification({ ...notification, open: false });

    const validateForm = (formData: NewUser) => {
        const errors: Partial<Record<keyof NewUser, string>> = {};

        if (formData.username.length > 50) {
            errors.username = "Username must not exceed 50 characters.";
        } else if (!formData.username || formData.username.trim().length === 0) {
            errors.username = "Username is required.";
        } else if (users.some((user) => user.username === formData.username)) {
            errors.username = "Username already exists.";
        }

        if (!formData.firstName || formData.firstName.trim().length === 0) {
            errors.firstName = "First Name is required.";
        }

        if (!formData.lastName || formData.lastName.trim().length === 0) {
            errors.lastName = "Last Name is required.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.email = "Invalid email format.";
        } else if (users.some((user) => user.email === formData.email)) {
            errors.email = "Email already exists.";
        }

        if ((formData.password ?? "").length < 8) {
            errors.password = "Password must be at least 8 characters long.";
        }

        if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = "Passwords do not match.";
        }

        if (!formData.role) {
            errors.role = "Role is required.";
        }

        return errors;
    };

    const handleSubmit = () => {
        const formData: NewUser = {
            username: refs.username.current?.value || "",
            firstName: refs.firstName.current?.value || "",
            lastName: refs.lastName.current?.value || "",
            email: refs.email.current?.value || "",
            password: refs.password.current?.value || "",
            confirmPassword: refs.confirmPassword.current?.value || "",
            role:
                (refs.role.current?.value as "Admin" | "Procurement Officer" | "Researcher") ?? "",
        };

        const errors = validateForm(formData);

        setUsernameError(errors.username || null);
        setFirstNameError(errors.firstName || null);
        setLastNameError(errors.lastName || null);
        setEmailError(errors.email || null);
        setPasswordError(errors.password || null);
        setConfirmPasswordError(errors.confirmPassword || null);
        setRoleError(errors.role || null);

        if (Object.keys(errors).length === 0) {
            try {
                addUserFx(formData);
                Object.values(refs).forEach((ref) => {
                    if (ref.current) {
                        ref.current.value = "";
                    }
                });

                setUsernameError(null);
                setFirstNameError(null);
                setLastNameError(null);
                setEmailError(null);
                setPasswordError(null);
                setConfirmPasswordError(null);
                setRoleError(null);

                setNotification({
                    open: true,
                    message: "User added successfully!",
                    type: "success",
                });
                setTimeout(() => {
                    removeModal();
                }, 500);
            } catch (_) {
                setNotification({
                    open: true,
                    message: "Failed to add user. Please try again.",
                    type: "error",
                });
                setTimeout(() => {
                    removeModal();
                }, 500);
            }
        }
    };

    return {
        refs,
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
        notification,
        handleClose,
    };
};
