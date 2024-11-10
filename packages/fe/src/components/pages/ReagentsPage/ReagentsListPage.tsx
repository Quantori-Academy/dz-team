import { Box, Button } from "@mui/material";
import { Outlet } from "@tanstack/react-router";

import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";

import { MainList } from "../mainList/MainList";
import { AddReagentForm } from "./AddReagentForm";

export const ReagentsListPage = () => {
    const createReagent = async () => {
        try {
            await createModal({
                name: "add_reagent",
                title: "Add Reagent",
                message: <AddReagentForm onClose={removeModal} />,
            });
            removeModal();
        } catch {
            removeModal();
        }
    };

    return (
        <Box>
            <MainList />
            <Button
                variant="contained"
                color="primary"
                sx={{ padding: 2, ml: 2 }}
                onClick={createReagent}
            >
                Add Reagent
            </Button>
            <Outlet />
        </Box>
    );
};
