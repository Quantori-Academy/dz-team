import { useCallback, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { removeModal } from "components/modal/store";
import { useModal } from "hooks/useModal";
import { useUserForm } from "hooks/useUserForm";
import { SupportedValue } from "utils/formatters";

import { AddUserForm } from "../pages/users/AddUserForm";
import { AddRecord } from "./Addrecord";
import { SearchField } from "./SearcheField";

type GridProps = {
    rows: Array<Record<string, SupportedValue>>;
    headers: Array<{ field: string; headerName: string }>;
    recordType: "user" | "detailedStorage";
};

export const Grid = ({ rows, headers, recordType }: GridProps) => {
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

    // opens modal for add user form
    const handleAddFormOpen = useCallback(() => {
        if (recordType === "user") {
            openModal({
                name: "add_user_modal",
                title: "Add New User",
                message: <AddUserForm onClose={() => removeModal()} />,
            });
        }
    }, [recordType, openModal]);

    const columns = useMemo(() => {
        const editColumn = {
            field: "actions",
            headerName: "Actions",
            width: 100,

            renderCell: (params: { row: { id: string } }) => (
                <>
                    <>
                        <GridActionsCellItem icon={<EditIcon />} label="Edit" color="inherit" />
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
                </>
            ),
        };
        return [...headers, editColumn];
    }, [headers, handleDeleteUser, recordType]);

    return (
        <>
            <SearchField
                recordType={recordType}
                searchQuery={searchQuery}
                onSearch={handleSearch}
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
                            buttonLabel={recordType === "user" ? "Add New User" : null}
                            onAddRecord={handleAddFormOpen}
                        />
                    ),
                }}
            />
        </>
    );
};
