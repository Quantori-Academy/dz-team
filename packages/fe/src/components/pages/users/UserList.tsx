import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Typography } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useGate } from "effector-react";

import { removeModal } from "components/modal/store";
import { useUserForm } from "hooks/useUserForm";
import { UsersGate } from "stores/users";
import { SupportedValue } from "utils/formatters";

import { Grid } from "../../dataGrid/Grid";
import { AddUserForm } from "./AddUserForm";

const headers = [
    { field: "username", headerName: "User Name", width: 150 },
    { field: "email", headerName: "Email", width: 170 },
    { field: "role", headerName: "Role", width: 170 },
    { field: "lastLoginDate", headerName: "Last login date", width: 170 },
];

const boxStyles = {
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
};

export const UserList = () => {
    useGate(UsersGate);

    const { users, handleDeleteUser } = useUserForm({});

    const renderActions = (row: Record<string, SupportedValue>) => {
        const id = row.id as string;
        return (
            <>
                <GridActionsCellItem icon={<EditIcon />} label="Edit" color="inherit" />
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    color="inherit"
                    onClick={() => handleDeleteUser(id)}
                />
            </>
        );
    };

    return (
        <Box sx={boxStyles}>
            <Typography variant="h5">User List</Typography>
            <Grid
                rows={users}
                headers={headers}
                searchPlaceholder="Search users by name, email, or role"
                renderActions={renderActions}
                modalTitle="Add New User"
                modalContent={<AddUserForm onClose={() => removeModal()} />}
            />
        </Box>
    );
};
