import { useState } from "react";
import { toast } from "react-toastify";

import { postStorage } from "api/storage/postStorage";
import { NewStorage } from "api/types";
import { removeModal } from "components/modal/store";
import { wait } from "utils";

type HookTypes = {
    name: React.RefObject<HTMLInputElement>;
    room: React.RefObject<HTMLInputElement>;
    description: React.RefObject<HTMLInputElement>;
};
export const useStorage = ({ name, room, description }: HookTypes) => {
    const [roomError, setRoomError] = useState<string | null>(null);
    const [nameError, setNameError] = useState<string | null>(null);
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
        const formData: NewStorage = {
            name: name.current?.value || "",
            room: room.current?.value || "",
            description: description?.current?.value || "",
        };
        if (validateForm(formData)) {
            if (name.current) name.current.value = "";
            if (room.current) room.current.value = "";
            if (description.current) description.current.value = "";
            try {
                await postStorage(formData);
                setRoomError(null);
                setNameError(null);
                toast.success("Storage Added successfully!");
                wait(500);
                removeModal();
            } catch (_error) {
                setErrorMessage(true);
                wait(500);
                setErrorMessage(false);
                wait(500);
                removeModal();
            }
        }
    };

    return {
        roomError,
        nameError,
        handleSubmit,
        errorMessage,
    };
};
