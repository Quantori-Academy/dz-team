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

        if (formData.room?.length > 300) {
            setRoomError("Room must not exceed 300 characters.");
            isValid = false;
        } else if (!formData.room || formData.room.trim().length === 0) {
            setRoomError("Room is required");
            isValid = false;
        }

        if (!formData.name || formData.name.trim().length === 0) {
            setNameError("Name is required.");
            isValid = false;
        } else if (formData.name.length > 300) {
            setNameError("Name must not exceed 300 characters");
        }

        return isValid;
    };

    // const handleSubmit = async () => {
    //     const formData: NewStorage = {
    //         name: name.current?.value || "",
    //         room: room.current?.value || "",
    //         description: description?.current?.value || "",
    //     };
    //     if (validateForm(formData)) {
    //         if (name.current) name.current.value = "";
    //         if (room.current) room.current.value = "";
    //         if (description.current) description.current.value = "";
    //         try {
    //             await addStorageFx(formData);
    //             setRoomError(null);
    //             setNameError(null);
    //             setConfirmMessage(true);
    //             setTimeout(() => {
    //                 setConfirmMessage(false);
    //             }, 2000);
    //         } catch (_error) {
    //             setErrorMessage(true);
    //             setTimeout(() => {
    //                 setErrorMessage(false);
    //             }, 2000);
    //         }
    //     }
    // };
    const handleSubmit = async () => {
        const currentFormData: NewStorage = {
            name: name.current?.value || "",
            room: room.current?.value || "",
            description: description?.current?.value || "",
        };

        if (validateForm(currentFormData)) {
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
