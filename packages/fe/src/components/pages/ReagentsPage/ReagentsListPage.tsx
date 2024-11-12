import { useState } from "react";
import { Outlet } from "@tanstack/react-router";
import { useUnit } from "effector-react";

import { $formData, initialFormData, setFormData, submitReagentEvent } from "stores/reagents";

import { MainList } from "../mainList/MainList";
import { AddReagentButton } from "./AddReagentButton";
import { ReagentFormModal } from "./ReagentFormModal";

export const ReagentsListPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleAddReagentClick = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const formData = useUnit($formData);
    const submitReagent = useUnit(submitReagentEvent);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "quantity" || name === "pricePerUnit" ? Number(value) : value,
        });
    };

    const handleSubmit = () => {
        submitReagent(formData);
        alert("Reagent added successfully!");
        setFormData(initialFormData);
        handleModalClose();
    };

    return (
        <>
            <MainList />
            <AddReagentButton onClick={handleAddReagentClick} />
            <ReagentFormModal
                isOpen={isModalOpen}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleModalClose={handleModalClose}
            />

            <Outlet />
        </>
    );
};
