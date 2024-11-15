import { useState } from "react";
import { useUnit } from "effector-react";

import { addStorageFx } from "stores/storage";
import { $usersList } from "stores/users";

export type NewStorage = {
    name: string;
    room: string;
    description: string;
};

export const useStorage = (refs: { [key: string]: React.RefObject<HTMLInputElement> }) => {
    const [roomError, setRoomError] = useState<string | null>(null);
    const [nameError, setNameError] = useState<string | null>(null);

    const users = useUnit($usersList);

    const validateForm = (formData: NewStorage) => {
        let isValid = true;

        if (formData.room.length > 300) {
            setRoomError("Room must not exceed 300 characters.");
            isValid = false;
        } else if (!formData.room || formData.room.trim().length === 0) {
            setRoomError("Room is required");
            isValid = false;
        }

        if (!formData.name || formData.name.trim().length === 0) {
            setNameError(" Name is required.");
            isValid = false;
        } else if (formData.name.length > 300) {
            setNameError("Name must not exceed 300 characters");
        }

        return isValid;
    };

    const handleSubmit = () => {
        const formData: NewStorage = {
            name: refs.name.current?.value as string,
            room: refs.room.current?.value as string,
            description: refs.description.current?.value as string,
        };

        if (validateForm(formData)) {
            addStorageFx(formData);
            setRoomError(null);
            setNameError(null);
        }
        refs.name.current!.value = "";
        refs.room.current!.value = "";
        refs.description.current!.value = "";
    };

    return {
        roomError,
        nameError,
        handleSubmit,
        users,
    };
};
