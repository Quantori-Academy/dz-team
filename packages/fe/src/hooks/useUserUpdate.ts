import { useState } from "react";

import { RoleType } from "shared/generated/zod/inputTypeSchemas/RoleSchema";

import { UpdateUser } from "./../../../shared/zodSchemas";
import { updateUserFx } from "./../stores/users";

type FormErrors = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: RoleType;
};

export const useUserUpdate = (
    id: string,
    refs: { [key: string]: React.RefObject<HTMLInputElement> },
) => {
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = (formData: UpdateUser) => {
        const newErrors: FormErrors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (formData.email && !emailRegex.test(formData.email))
            newErrors.email = "Invalid email format.";

        if (formData.password && formData.password.length < 8)
            newErrors.password = "Password must be at least 8 characters long.";
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        const formData: UpdateUser = {
            firstName: refs.firstName.current?.value || "",
            lastName: refs.lastName.current?.value || "",
            email: refs.email.current?.value || "",
            password: refs.password.current?.value || "",
            role: (refs.role.current?.value as RoleType) || undefined,
        };

        if (validateForm(formData)) {
            updateUserFx({ id, userData: formData });
            setErrors({});
        }
        refs.firstName.current!.value = "";
        refs.lastName.current!.value = "";
        refs.email.current!.value = "";
        refs.password.current!.value = "";
    };

    return {
        errors,
        handleSubmit,
    };
};
