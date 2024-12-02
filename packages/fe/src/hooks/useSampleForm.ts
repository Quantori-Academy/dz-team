import { useState } from "react";

import { postSamples } from "api/combinedList/postSamples";
import { SampleData } from "api/types";

type HookProps = {
    name: React.RefObject<HTMLInputElement>;
    structure: React.RefObject<HTMLInputElement>;
    description: React.RefObject<HTMLInputElement>;
    quantityUnit: React.RefObject<HTMLInputElement>;
    quantity: React.RefObject<HTMLInputElement>;
    quantityLeft: React.RefObject<HTMLInputElement>;
    reagentsUsed: React.RefObject<HTMLInputElement>;
    expirationDate: React.RefObject<HTMLInputElement>;
    storageLocation: React.RefObject<HTMLInputElement>;
};

export const useSample = ({
    name,
    structure,
    description,
    quantityUnit,
    quantity,
    quantityLeft,
    reagentsUsed,
    expirationDate,
    storageLocation,
}: HookProps) => {
    const [nameError, setNameError] = useState<string | null>(null);
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
        return isValid;
    };

    const handleSubmit = async () => {
        const formData: SampleData = {
            name: name.current?.value || "",
            structure: structure.current?.value || "",
            description: description.current?.value || "",
            quantityUnit: quantityUnit.current?.value || "",
            quantity: Number(quantity.current?.value || 0),
            quantityLeft: Number(quantityLeft.current?.value || 0),
            reagentsUsed: reagentsUsed.current?.value ? reagentsUsed.current.value.split(",") : [],
            expirationDate: expirationDate.current?.value || "",
            storageLocation: storageLocation.current?.value || "",
        };

        if (validateForm(formData)) {
            try {
                await postSamples(formData);
                setNameError(null);
                setConfirmMessage(true);
                setTimeout(() => {
                    setConfirmMessage(false);
                }, 2000);
            } catch (_) {
                setErrorMessage(true);
                setTimeout(() => {
                    setErrorMessage(false);
                }, 2000);
            }
        }
    };

    return {
        nameError,
        confirmMessage,
        errorMessage,
        handleSubmit,
    };
};
