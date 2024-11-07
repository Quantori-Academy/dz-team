import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useGate, useUnit } from "effector-react";

import { CreateReagentType } from "api/reagents";
import { $ReagentsList, fetchReagentsFx, ReagentsGate, submitReagentEvent } from "stores/reagents";

import { AddReagentButton } from "./AddReagentButton";
import { ReagentFormModal } from "./ReagentFormModal";
import { ReagentsTable } from "./ReagentsTable";

export const ReagentsListPage = () => {
    useGate(ReagentsGate);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleAddReagentClick = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const handleRowClick = (row: { id: string }) => {
        navigate({ to: `/reagents/${row.id}`, replace: false });
    };

    const reagents = useUnit($ReagentsList);

    const [formData, setFormData] = useState<CreateReagentType>({
        // id: "",
        name: "",
        description: "",
        structure: "",
        cas: "",
        producer: "",
        catalogId: "",
        catalogLink: "",
        pricePerUnit: 0,
        unit: "",
        quantity: 0,
        expirationDate: new Date().toISOString().split("T")[0],
        storageLocation: "",
    });

    useEffect(() => {
        fetchReagentsFx();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "quantity" || name === "pricePerUnit" ? Number(value) : value,
        });
    };

    const submitReagent = useUnit(submitReagentEvent);

    const handleSubmit = () => {
        submitReagent(formData);
        alert("Reagent added successfully!");
        handleModalClose();
    };

    return (
        <Box>
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
