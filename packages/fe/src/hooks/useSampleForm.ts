import { useRef, useState } from "react";
import { toast } from "react-toastify";

import { postSample } from "api/combinedList/postSample";
import { SampleData } from "api/types";
import { removeModal } from "components/modal/store";

type HookProps = {
    unit: string;
    reagentsAndSamplesUsed: string[];
    selectedStorage: { id: string; name: string } | null;
};

export const useSample = ({ unit, reagentsAndSamplesUsed, selectedStorage }: HookProps) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const structureRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);
    const expirationDateRef = useRef<HTMLInputElement>(null);

    const [nameError, setNameError] = useState<string | null>(null);
    const [storageIdError, setStorageIdError] = useState<string | null>(null);

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
            name: nameRef.current?.value || "",
            structure: structureRef.current?.value || "",
            description: descriptionRef.current?.value || "",
            unit,
            quantity: Number(quantityRef.current?.value || 0),
            reagentIds: reagentsAndSamplesUsed,
            storageLocation: selectedStorage?.name || "",
            storageId: selectedStorage?.id || "",
        };

        if (validateForm(formData)) {
            try {
                await postSample(formData);
                toast.success("Sample is added successfully!");
                setTimeout(() => {
                    removeModal();
                }, 500);
            } catch (_error) {
                toast.error("An error occurred while adding the sample.");
                setTimeout(() => {
                    removeModal();
                }, 500);
            }
        }
    };

    return {
        nameRef,
        structureRef,
        descriptionRef,
        quantityRef,
        expirationDateRef,
        nameError,
        storageIdError,
        handleSubmit,
    };
};
