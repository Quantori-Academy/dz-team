import { useCallback, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import PageviewIcon from "@mui/icons-material/Pageview";
import { TextField } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "@tanstack/react-router";

import { removeModal } from "components/modal/store";
import { StorageDialog } from "components/pages/storage/StorageDialog";
import { useModal } from "hooks/useModal";
import { useSession } from "hooks/useSession";
import { useUserForm } from "hooks/useUserForm";
import { fetchDetailedStorageFx } from "stores/storage";
import { SupportedValue } from "utils/formatters";

import { AddRecord } from "./Addrecord";
import { AddUserForm } from "./AddUserForm";

type GridProps = {
    rows: Array<Record<string, SupportedValue>>;
    headers: Array<{ field: string; headerName: string }>;
    recordType: "user" | "storage" | "detailedReagents";
};
// type RowDataType = {
//     id: string;
//     room: string;
//     name: string;
//     description: string;
// };

export const Grid = ({ rows, headers, recordType }: GridProps) => {
    const { isAdmin } = useSession();
    const navigate = useNavigate();
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
                        nestedValue.toLowerCase().includes(searchQuery.toLowerCase())
                );
            }
            return false;
        })
    );

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
                title: "Delete Storage",
                message: <StorageDialog onClose={() => removeModal()} />,
            });
        }
    }, [recordType, openModal]);

    const handleRowClick = useCallback(
        (id: string) => {
            fetchDetailedStorageFx(id);
            navigate({ to: `/storageDetail`, replace: false });
        },
        [navigate]
    );

    const handleDeleteStorage = useCallback(
        (id: string) => {
            fetchDetailedStorageFx(id);
            handleAddFormOpen();
        },
        [handleAddFormOpen]
    );

    const columns = useMemo(() => {
        const editColumn = {
            field: "actions",
            headerName: "Actions",
            width: 100,

            renderCell: (params: { row: { id: string } }) => (
                // TODO whats wrong with id here
                <>
                    {recordType !== "detailedReagents" && !isAdmin && (
                        <GridActionsCellItem
                            icon={<PageviewIcon />}
                            label="View"
                            color="inherit"
                            onClick={() => handleRowClick(params.row.id)}
                        />
                    )}

                    {isAdmin && (
                        <>
                            <GridActionsCellItem
                                icon={<EditIcon />}
                                label="Edit"
                                onClick={() => alert("Edit item")}
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
    }, [headers, handleDeleteUser, handleDeleteStorage, isAdmin, handleRowClick, recordType]);

    return (
        <>
            <TextField
                variant="outlined"
                placeholder={
                    recordType === "user"
                        ? "Search by name, username, or email"
                        : recordType === "detailedReagents"
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
                        <AddRecord buttonLabel="Add New User" onAddRecord={handleAddFormOpen} />
                    ),
                }}
            />
        </>
    );
};
