import { useCallback, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import PageviewIcon from "@mui/icons-material/Pageview";
import { TextField } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { removeModal } from "components/modal/store";
import { StorageAddForm } from "components/pages/storage/StorageAddForm";
import { useModal } from "hooks/useModal";
import { useSession } from "hooks/useSession";
import { useUserForm } from "hooks/useUserForm";
import { SupportedValue } from "utils/formatters";

import { AddUserForm } from "../pages/users/AddUserForm";
import { AddRecord } from "./Addrecord";

type GridProps = {
    rows: Array<Record<string, SupportedValue>>;
    headers: Array<{ field: string; headerName: string }>;

    recordType: "user" | "storage" | "detailedStorage";
};

export const Grid = ({ rows, headers, recordType }: GridProps) => {
    const { isAdmin } = useSession();

    const { handleDeleteUser } = useUserForm({});
    const { openModal } = useModal();

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredRows = rows.filter((row) =>
        Object.values(row).some((value) => {
            if (typeof value === "string") {
                return value.toLowerCase().includes(searchQuery.toLowerCase());
            }
            if (typeof value === "number") {
                return value.toString().includes(searchQuery.toLowerCase());
            }
            if (value && typeof value === "object") {
                return Object.values(value).some(
                    (nestedValue) =>
                        typeof nestedValue === "string" &&
                        nestedValue.toLowerCase().includes(searchQuery.toLowerCase()),
                );
            }
            return false;
        }),
    );

    // opens modal for add user form and add storage form
    const handleAddFormOpen = useCallback(() => {
        if (recordType === "user") {
            openModal({
                name: "add_user_modal",
                title: "Add New User",
                message: <AddUserForm onClose={() => removeModal()} />,
            });
        } else if (recordType === "storage") {
            openModal({
                name: "add_storage_modal",
                title: "Add New Storage",
                message: <StorageAddForm onClose={() => removeModal()} />,
            });
        }
    }, [recordType, openModal]);

    const columns = useMemo(() => {
        const editColumn = {
            field: "actions",
            headerName: "Actions",
            width: 100,

            renderCell: (params: { row: { id: string } }) => (
                // TODO whats wrong with id here
                <>
                    {recordType !== "detailedStorage" && !isAdmin && (
                        <GridActionsCellItem
                            icon={<PageviewIcon />}
                            label="View"
                            color="inherit"
                            // onClick={() => handleRowClick(params.row.id)}
                        />
                    )}

                    {isAdmin && (
                        <>
                            <GridActionsCellItem
                                icon={<EditIcon />}
                                label="Edit"
                                onClick={() => {
                                    if (recordType === "user") {
                                        alert("edit user");
                                    }
                                }}
                                color="inherit"
                            />
                            <GridActionsCellItem
                                icon={<DeleteIcon />}
                                label="Delete"
                                onClick={() => {
                                    if (recordType === "user") {
                                        handleDeleteUser(params.row.id);
                                    }
                                }}
                                color="inherit"
                            />
                        </>
                    )}
                </>
            ),
        };
        return [...headers, editColumn];
    }, [headers, handleDeleteUser, isAdmin, recordType]);

    return (
        <>
            {recordType !== "detailedStorage" && (
                <TextField
                    variant="outlined"
                    placeholder={
                        recordType === "user"
                            ? "Search by name, username, or email"
                            : "Search by room or shelf"
                    }
                    value={searchQuery}
                    onChange={handleSearch}
                />
            )}
            <DataGrid
                rows={filteredRows}
                rowHeight={60}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[5, 15, 25, 50]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                slots={{
                    toolbar: () => (
                        <AddRecord
                            buttonLabel={
                                recordType === "user"
                                    ? "Add New User"
                                    : recordType === "storage"
                                      ? "Add New Storage"
                                      : null
                            }
                            onAddRecord={handleAddFormOpen}
                        />
                    ),
                }}
            />
        </>
    );
};
