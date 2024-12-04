import { useState } from "react";

import { postSamples } from "api/combinedList/postSamples";
import { SampleData } from "api/types";

type HookProps = {
    name: React.RefObject<HTMLInputElement>;
    structure: React.RefObject<HTMLInputElement>;
    description: React.RefObject<HTMLInputElement>;
    quantity: React.RefObject<HTMLInputElement>;
    quantityLeft: React.RefObject<HTMLInputElement>;
    reagentsAndSamplesUsed: string[];
    expirationDate: React.RefObject<HTMLInputElement>;
    storageLocation: React.RefObject<{ value: string }>;
    storageId: React.RefObject<{ value: string }>;
    quantityUnit: string;
};

export const useSample = ({
    name,
    structure,
    description,
    quantity,
    quantityLeft,
    reagentsAndSamplesUsed,
    expirationDate,
    storageLocation,
    storageId,
    quantityUnit,
}: HookProps) => {
    const [nameError, setNameError] = useState<string | null>(null);
    const [storageIdError, setStorageIdError] = useState<string | null>(null);
    const [confirmMessage, setConfirmMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const validateForm = (formData: SampleData) => {
        let isValid = true;

        if (!formData.name || formData.name.trim().length === 0) {
            setNameError("Name is required");
            isValid = false;
        } else if (formData.name.length > 100) {
            setNameError("Name must not exceed 100 characters.");
            isValid = false;
        } else {
            setNameError(null);
        }

        if (!formData.storageId || formData.storageId.trim().length === 0) {
            setStorageIdError("Storage is required.");
            isValid = false;
        } else {
            setStorageIdError(null);
        }

        return isValid;
    };

    const handleSubmit = async () => {
        const formData: SampleData = {
            name: name.current?.value || "",
            structure: structure.current?.value || "",
            description: description.current?.value || "",
            quantityUnit,
            quantity: Number(quantity.current?.value || 0),
            quantityLeft: Number(quantityLeft.current?.value || 0),
            reagentsUsed: reagentsAndSamplesUsed,
            expirationDate: expirationDate.current?.value || "",
            storageLocation: storageLocation.current?.value || "",
            storageId: storageId.current?.value || "",
        };

        if (validateForm(formData)) {
            try {
                await postSamples(formData);
                setConfirmMessage(true);
                setTimeout(() => setConfirmMessage(false), 2000);
            } catch (_error) {
                setErrorMessage(true);
                setTimeout(() => setErrorMessage(false), 2000);
            }
        }
    };

    return {
        nameError,
        storageIdError,
        confirmMessage,
        errorMessage,
        handleSubmit,
    };
};
