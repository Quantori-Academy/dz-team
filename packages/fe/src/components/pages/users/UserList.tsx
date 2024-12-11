import { toast } from "react-toastify";
import { useGate, useUnit } from "effector-react";

import { createModal } from "components/modal/createModal";
import { useUserForm } from "hooks/useUserForm";
import { deleteUserFx, UsersGate } from "stores/users";

import { Grid } from "../../dataGrid/Grid";
import { AddUserForm } from "./AddUserForm";

const headers = [
    { field: "username", headerName: "User Name", width: 150 },
    { field: "email", headerName: "Email", width: 170 },
    { field: "role", headerName: "Role", width: 170 },
    { field: "lastLoginDate", headerName: "Last login date", width: 170 },
];

export const UserList = () => {
    useGate(UsersGate);
    const deleteUser = useUnit(deleteUserFx);

    const { users } = useUserForm();

    const openDeleteModal = async (id: string) => {
        const toDelete = await createModal({
            name: "confirm_delete_modal",
            message: "Are you sure you want to delete this user?",
            labels: { ok: "Yes", cancel: "No" },
        });
        if (toDelete) {
            await deleteUser(id);
            toast.success("User deleted successfully!");
        }
    };

    return (
        <Grid
            rows={users}
            headers={headers}
            searchPlaceholder="Search users by name, email, or role"
            handleDelete={openDeleteModal}
            addButtonLabel="Add New User"
            modalContent={(removeModal) => <AddUserForm onClose={removeModal} />}
        />
    );
};
