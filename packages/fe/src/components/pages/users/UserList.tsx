import { Box } from "@mui/material";
import { useGate } from "effector-react";

import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";
import { useUserForm } from "hooks/useUserForm";
import { UsersGate } from "stores/users";

import { Grid } from "../../dataGrid/Grid";
import { AddUserForm } from "./AddUserForm";
import { ConfirmMessage } from "./ConfirmMessage";

const headers = [
    { field: "username", headerName: "User Name", width: 150 },
    { field: "email", headerName: "Email", width: 170 },
    { field: "role", headerName: "Role", width: 170 },
    { field: "lastLoginDate", headerName: "Last login date", width: 170 },
];

export const UserList = () => {
    useGate(UsersGate);

    const { users } = useUserForm();

    const openDeleteModal = async (id: string) => {
        await createModal({
            name: "confirm_delete_modal",
            title: "Confirm Deletion",
            message: (
                <ConfirmMessage
                    id={id}
                    onClose={() => {
                        removeModal();
                    }}
                />
            ),
        });
    };

    return (
        <Box>
            <Grid
                rows={users}
                headers={headers}
                searchPlaceholder="Search users by name, email, or role"
                handleDelete={openDeleteModal}
                addButtonLabel="Add New User"
                modalContent={(removeModal) => <AddUserForm onClose={removeModal} />}
            />
        </Box>
    );
};
