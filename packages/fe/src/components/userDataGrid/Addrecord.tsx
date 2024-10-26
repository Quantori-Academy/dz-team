import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { GridToolbarContainer } from "@mui/x-data-grid";

import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";
import { AddUserForm } from "components/userDataGrid/AddUserForm";

export const AddRecord = () => {
    const handleAddUser = async () => {
        try {
            await createModal({
                name: "add_user_modal",
                title: "Add New User",
                message: <AddUserForm />,
                labels: [{ ok: "Confirm" }, { cancel: "Close" }],
            });
            removeModal();
            window.location.reload();
        } catch (_) {
            removeModal();
            window.location.reload();
        }
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleAddUser}>
                Add New User
            </Button>
        </GridToolbarContainer>
    );
};
