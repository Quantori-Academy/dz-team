import { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import { useGate } from "effector-react";

import { ReagentsGate } from "stores/reagents";

import { MainList } from "../mainList/MainList";
import { AddReagentForm } from "./AddReagentForm";

export const ReagentsListPage = () => {
    useGate(ReagentsGate);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleAddReagentClick = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    return (
        <Box>
            <MainList />
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ padding: 2, ml: 2 }}
                    onClick={handleAddReagentClick}
                >
                    Add Reagent
                </Button>
            </Box>
            <Modal open={isModalOpen} onClose={handleModalClose}>
                <AddReagentForm onClose={handleModalClose} />
            </Modal>
            <Outlet />
        </Box>
    );
};
