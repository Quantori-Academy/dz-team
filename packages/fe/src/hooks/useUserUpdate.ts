import { useEffect, useState } from "react";

import { RoleType } from "shared/generated/zod/inputTypeSchemas/RoleSchema";
import { UpdateUser } from "shared/zodSchemas/user/updateUserSchema";

import { updateUserFx } from "../stores/users";

// Form error definitions
type FormErrors = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: string;
    id?: string;
};

export const useUserUpdate = (
    initialData: UpdateUser | null, // Initial user data
    refs: { [key: string]: React.RefObject<HTMLInputElement> },
) => {
    const [errors, setErrors] = useState<FormErrors>({});
    const [formData, setFormData] = useState<UpdateUser | null>(initialData);

    // Initialize form values from initialData
    useEffect(() => {
        if (initialData) {
            if (refs.firstName.current) refs.firstName.current.value = initialData.firstName || "";
            if (refs.lastName.current) refs.lastName.current.value = initialData.lastName || "";
            if (refs.email.current) refs.email.current.value = initialData.email || "";
            if (refs.password.current) refs.password.current.value = initialData.password || "";
            if (refs.role.current) refs.role.current.value = initialData.role || "";
            if (refs.id.current) refs.id.current.value = initialData.id || "";
            setFormData(initialData);
        }
    }, [initialData, refs]);

    // Form validation
    const validateForm = (data: UpdateUser) => {
        const newErrors: FormErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (data.email && !emailRegex.test(data.email)) {
            newErrors.email = "Invalid email format.";
        }

        if (data.password && data.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters long.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // Form submission handler
    const handleSubmit = async () => {
        if (!formData) {
            return;
        }
        const newFormData: UpdateUser = {
            id: refs.id.current?.value || "", // Use refs to get id
            firstName: refs.firstName.current?.value || "",
            lastName: refs.lastName.current?.value || "",
            email: refs.email.current?.value || "",
            password: refs.password.current?.value || "",
            role: (refs.role.current?.value as RoleType) || undefined,
        };

        const changes: Partial<UpdateUser> = {};

        // Filter keys and check for changes
        (Object.keys(newFormData) as (keyof UpdateUser)[]).forEach((key) => {
            const currentValue = newFormData[key];
            const originalValue = formData[key];

            // Compare values for all fields, including id
            if (currentValue !== originalValue) {
                if (key === "role") {
                    if (
                        currentValue === "admin" ||
                        currentValue === "researcher" ||
                        currentValue === "procurementOfficer" ||
                        currentValue === undefined
                    ) {
                        changes[key] = currentValue;
                    }
                } else if (key === "password") {
                    if (typeof currentValue === "string" && currentValue !== "") {
                        changes[key] = currentValue;
                    }
                } else {
                    if (typeof currentValue === "string" || currentValue === undefined) {
                        changes[key] = currentValue;
                    }
                }
            }
        });

        // If the form is valid and there are changes, submit them
        if (validateForm(newFormData) && Object.keys(changes).length > 0) {
            try {
                // Submit data with changes
                if (newFormData.id) {
                    await updateUserFx({ id: newFormData.id, userData: changes });
                    setFormData((prev) => ({
                        ...prev,
                        ...changes, // update only the fields that have changed
                    }));
                    setErrors({});
                }
            } catch (error) {
                return error;
            }
        }
    };

    return {
        errors,
        handleSubmit,
    };
};
