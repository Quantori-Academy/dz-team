import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useUnit } from "effector-react";

import { UserRole } from "api/self";
import { NewUser } from "api/types";
import { removeModal } from "components/modal/store";
import { $usersList, addUserFx, deleteUserFx } from "stores/users";

const validateForm = (formData: NewUser) => {
    const errors: Partial<Record<keyof NewUser, string>> = {};

    if (!formData.username || formData.username.trim().length === 0) {
        errors.username = "Username is required.";
    }

    if (!formData.firstName || formData.firstName.trim().length === 0) {
        errors.firstName = "First Name is required.";
    }

    if (!formData.lastName || formData.lastName.trim().length === 0) {
        errors.lastName = "Last Name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = "Invalid email format.";
    }

    if (!formData.password || formData.password.length < 8) {
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

    const handleDeleteClick = async (id: string) => {
        await deleteUserFx(id);
        toast.success("User deleted successfully!");
    };

    const handleSubmit = async () => {
        const formData: NewUser = {
            username: refs.username.current?.value || "",
            firstName: refs.firstName.current?.value || "",
            lastName: refs.lastName.current?.value || "",
            email: refs.email.current?.value || "",
            password: refs.password.current?.value || "",
            confirmPassword: refs.confirmPassword.current?.value || "",
            role: (refs.role.current?.value as UserRole) ?? "",
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
            await addUserFx(formData);

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

            toast.success("User added successfully!");
            removeModal();
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
    };
};
