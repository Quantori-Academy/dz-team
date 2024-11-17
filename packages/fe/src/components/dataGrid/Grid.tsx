import { useCallback, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import PageviewIcon from "@mui/icons-material/Pageview";
import { TextField } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { removeModal } from "components/modal/store";
import { StorageEditForm } from "components/pages/storage/EditStorage";
import { StorageAddForm } from "components/pages/storage/StorageAddForm";
import { StorageDialog } from "components/pages/storage/StorageDialog";
import { useModal } from "hooks/useModal";
import { useSession } from "hooks/useSession";
import { useUserForm } from "hooks/useUserForm";
import { fetchDetailedStorageFx } from "stores/storage";
import { SupportedValue } from "utils/formatters";

import { AddUserForm } from "../pages/users/AddUserForm";
import { AddRecord } from "./Addrecord";

type GridProps = {
    rows: Array<Record<string, SupportedValue>>;
    headers: Array<{ field: string; headerName: string }>;

    recordType: "user" | "storage" | "detailedStorage";
};
// type RowDataType = {
//     id: string;
//     room: string;
//     name: string;
//     description: string;
// };

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

    // opens modal to delete storage
    const handleDeleteStorageLocation = useCallback(() => {
        openModal({
            name: "add_storage_modal",
            title: "Delete Storage",
            message: <StorageDialog onClose={() => removeModal()} />,
        });
    }, [openModal]);

    // modal for edit storage form
    const handleEditStorageLocation = useCallback(() => {
        openModal({
            name: "edit_storage_modal",
            title: "Edit Storage",
            message: <StorageEditForm onClose={() => removeModal()} />,
        });
    }, [openModal]);

    // navigates to detailed storage page
    // const handleRowClick = useCallback(
    //     (id: string) => {
    //         fetchDetailedStorageFx(id);
    //         navigate({ to: `/storageDetail`, replace: false });
    //     },
    //     [navigate],
    // );

    // opens modal for edit storage form
    const handleEditStorage = useCallback(
        (id: string) => {
            fetchDetailedStorageFx(id);
            handleEditStorageLocation();
        },
        [handleEditStorageLocation],
    );

    // opens confilm message to delete storage
    const handleDeleteStorage = useCallback(
        (id: string) => {
            fetchDetailedStorageFx(id);
            handleDeleteStorageLocation();
        },
        [handleDeleteStorageLocation],
    );

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
                                    } else if (recordType === "storage") {
                                        handleEditStorage(params.row.id);
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
                                    } else if (recordType === "storage") {
                                        handleDeleteStorage(params.row.id);
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
    }, [
        headers,
        handleDeleteUser,
        handleDeleteStorage,
        isAdmin,
        // handleRowClick,
        recordType,
        handleEditStorage,
    ]);

    return (
        <>
            <TextField
                variant="outlined"
                placeholder={
                    recordType === "user"
                        ? "Search by name, username, or email"
                        : recordType === "detailedStorage"
                          ? "Search Reagent"
                          : "Search by room or shelf"
                }
                value={searchQuery}
                onChange={handleSearch}
                sx={{ width: "350px", marginBottom: "16px" }}
            />
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
                                      : "Add New Record"
                            }
                            onAddRecord={handleAddFormOpen}
                        />
                    ),
                }}
            />
        </>
    );
};
