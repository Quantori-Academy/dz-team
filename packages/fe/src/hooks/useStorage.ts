import { useState } from "react";

import { addStorageFx, setFormData } from "stores/storage";

export type NewStorage = {
    name: string;
    room: string;
    description: string;
};

type HookTypes = {
    name: React.RefObject<HTMLInputElement>;
    room: React.RefObject<HTMLInputElement>;
    description: React.RefObject<HTMLInputElement>;
};
export const useStorage = ({ name, room, description }: HookTypes) => {
    const [roomError, setRoomError] = useState<string | null>(null);
    const [nameError, setNameError] = useState<string | null>(null);
    const [confirmMessage, setConfirmMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const validateForm = (formData: NewStorage) => {
        let isValid = true;

        (["room", "name"] as const).forEach((field) => {
            if (!formData[field] || formData[field].trim().length === 0) {
                if (field === "room") {
                    setRoomError("Room is required");
                } else {
                    setNameError("Name is required");
                }
                isValid = false;
            } else if (formData[field].length > 300) {
                if (field === "room") {
                    setRoomError("Room must not exceed 300 characters.");
                } else {
                    setNameError("Name must not exceed 300 characters.");
                }
                isValid = false;
            }
        });
        return isValid;
    };

    const handleSubmit = async () => {
        const currentFormData: NewStorage = {
            name: name.current?.value || "",
            room: room.current?.value || "",
            description: description?.current?.value || "",
        };

        if (validateForm(currentFormData)) {
            if (name.current) name.current.value = "";
            if (room.current) room.current.value = "";
            if (description.current) description.current.value = "";
            setFormData(currentFormData);

            try {
                await addStorageFx();
                setFormData({ name: "", room: "", description: "" });
                setRoomError(null);
                setNameError(null);
                setConfirmMessage(true);
                setTimeout(() => setConfirmMessage(false), 2000);
            } catch (_) {
                setErrorMessage(true);
                setTimeout(() => setErrorMessage(false), 2000);
            }
        }
    };

    return {
        roomError,
        nameError,
        handleSubmit,
        confirmMessage,
        errorMessage,
    };
};
