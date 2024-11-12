import { useState } from "react";
import { useUnit } from "effector-react";

import { NewUser } from "api/users/addUser";
import { $usersList, addUserFx, deleteUserFx } from "stores/users";

type FormErrors = {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
};

export const useUserForm = (refs: { [key: string]: React.RefObject<HTMLInputElement> }) => {
    const [errors, setErrors] = useState<FormErrors>({});

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const users = useUnit($usersList);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    // delete function for user checks the role and opens the notification bar if role is admin
    const handleDeleteClick = (id: string) => {
        const user = users.find((user) => user.id === id);
        if (user?.role === "admin") {
            setOpenSnackbar(true);
            return;
        }
        deleteUserFx(id);
    };

    const validateForm = (formData: NewUser) => {
        const newErrors: FormErrors = {};

        if (users.some((user) => user.username === formData.username)) {
            newErrors.username = "Username already exists.";
        } else if (formData.username.length > 50) {
            newErrors.username = "Username must not exceed 50 characters.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (users.some((user) => user.email === formData.email)) {
            newErrors.email = "Email already exists.";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format.";
        }

        if ((formData.password ?? "").length < 8) {
            newErrors.password = "Password must be at least 8 characters long.";
        }

        if (formData.confirmPassword !== formData.password)
            newErrors.confirmPassword = "Passwords do not match.";
        if (!formData.role) newErrors.role = "Role is required.";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
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
        handleDeleteClick,
        handleCloseSnackbar,
        openSnackbar,
        users,
    };
};
