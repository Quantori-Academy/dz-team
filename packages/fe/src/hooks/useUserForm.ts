import { useRef, useState } from "react";
import { toast } from "react-toastify";
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
        toast.success("Record deleted successfully!");
    };

    const handleClose = () => setNotification({ ...notification, open: false });

    const validateForm = (formData: NewUser) => {
        const errors: Partial<Record<keyof NewUser, string>> = {};

        if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = "Passwords do not match.";
        }
        return errors;
    };

    const handleSubmit = async () => {
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

                setTimeout(() => {
                    removeModal();
                }, 500);
            } catch (_error) {
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
