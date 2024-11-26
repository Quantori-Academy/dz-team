import { useState } from "react";
import { useUnit } from "effector-react";

import { removeModal } from "components/modal/store";
import { $usersList, addUserFx, deleteUserFx } from "stores/users";

export type NewUser = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
};
type Notification = {
    message: string;
    type: "error" | "success";
    open: boolean;
};

export const useUserForm = (refs: { [key: string]: React.RefObject<HTMLInputElement> }) => {
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [firstNameError, setFirstNameError] = useState<string | null>(null);
    const [lastNameError, setLastNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
    const [roleError, setRoleError] = useState<string | null>(null);

    const users = useUnit($usersList);

    const [notification, setNotification] = useState<Notification>({
        message: "",
        type: "success",
        open: false,
    });

    // User delete handler
    const handleDeleteClick = async (id: string) => {
        try {
            await deleteUserFx(id);
            setNotification({ message: "User deleted successfully!", type: "success", open: true });
        } catch {
            setNotification({ message: "Failed to delete the user.", type: "error", open: true });
        }
    };
    const handleClose = () => setNotification({ ...notification, open: false });

    // Form validation
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

    // Submit handler
    const handleSubmit = () => {
        const formData: NewUser = {
            username: refs.username.current?.value || "",
            firstName: refs.firstName.current?.value || "",
            lastName: refs.lastName.current?.value || "",
            email: refs.email.current?.value || "",
            password: refs.password.current?.value || "",
            confirmPassword: refs.confirmPassword.current?.value || "",
            role: refs.role.current?.value || "",
        };

        const errors = validateForm(formData);

        // Set individual errors
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

                // Clear all input fields if the form is valid
                refs.username.current!.value = "";
                refs.firstName.current!.value = "";
                refs.lastName.current!.value = "";
                refs.email.current!.value = "";
                refs.password.current!.value = "";
                refs.confirmPassword.current!.value = "";
                if (errors.role) {
                    refs.role.current!.value = "";
                }

                // Clear errors after successful submission
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
                }, 2500);
            } catch (_) {
                setNotification({
                    open: true,
                    message: "Failed to add user. Please try again.",
                    type: "error",
                });
            }
        }
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
        notification,
        handleClose,
    };
};
