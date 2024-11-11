import { useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useGate, useUnit } from "effector-react";

import {
    $formData,
    $reagentsList,
    initialFormData,
    ReagentsGate,
    setFormData,
    submitReagentEvent,
} from "stores/reagents";

import { AddReagentButton } from "./AddReagentButton";
import { ReagentFormModal } from "./ReagentFormModal";
import { ReagentsTable } from "./ReagentsTable";
// import { MainList } from "../mainList/MainList";

export const ReagentsListPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleAddReagentClick = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleRowClick = (row: { id: string }) => {
        navigate({ to: `/reagents/${row.id}`, replace: false });
    };

    const reagents = useUnit($reagentsList);
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
        <Box>
<!--           <MainList /> -->
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "30px",
                    marginTop: "5%",
                }}
            >
                <AddReagentButton onClick={handleAddReagentClick} />
            </Box>
            <ReagentsTable reagents={reagents} onRowClick={handleRowClick} />
            <ReagentFormModal
                isOpen={isModalOpen}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleModalClose={handleModalClose}
            />

            <Outlet />
        </Box>
    );
};
