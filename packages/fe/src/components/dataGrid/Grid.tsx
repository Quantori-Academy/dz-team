import { useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridActionsCellItem, GridRowParams } from "@mui/x-data-grid";

import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";
import { useUserForm } from "hooks/useUserForm";
import { SupportedValue } from "utils/formatters";

import { AddUserForm } from "../pages/users/AddUserForm";
import { AddRecord } from "./Addrecord";
import { SearchField } from "./SearcheField";

type GridProps = {
    rows: Array<Record<string, SupportedValue>>;
    headers: Array<{ field: string; headerName: string }>;
    onRowClick?: (row: Record<string, SupportedValue>) => void;
    buttonLabel?: string;
    showSearchField?: boolean;
    showAddRecord?: boolean;
};

export const Grid = ({
    rows,
    headers,
    onRowClick,
    buttonLabel,
    showSearchField,
    showAddRecord,
}: GridProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const { handleDeleteClick } = useUserForm({});

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

    const handleAddFormOpen = async () => {
        try {
            await createModal({
                name: "add_user_modal",
                title: "Add New User",
                message: <AddUserForm onClose={() => removeModal()} />,
            });
            removeModal();
        } catch (_error) {
            removeModal();
        }
    };

    const columns = useMemo(() => {
        const editColumn = {
            field: "actions",
            headerName: "Actions",
            width: 100,
            renderCell: (params: { row: { id: string } }) => (
                <>
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={() => alert("Edit item:")}
                        color="inherit"
                    />
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleDeleteClick(params.row.id)}
                        color="inherit"
                    />
                </>
            ),
        };
        return [...headers, editColumn];
    }, [headers, handleDeleteClick]);

    return (
        <>
            {showSearchField && <SearchField searchQuery={searchQuery} onSearch={handleSearch} />}
            <DataGrid
                rows={filteredRows}
                rowHeight={60}
                getRowId={(row) =>
                    typeof row.id === "string" || typeof row.id === "number"
                        ? row.id
                        : `${String(row.username ?? "unknown")}-${Math.random().toString(36).substring(2, 9)}`
                }
                columns={columns}
                disableRowSelectionOnClick
                onRowClick={(params: GridRowParams<Record<string, SupportedValue>>) =>
                    onRowClick?.(params.row)
                }
                pageSizeOptions={[5, 15, 25, 50]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                slots={{
                    toolbar: () =>
                        showAddRecord && (
                            <AddRecord buttonLabel={buttonLabel} onAddRecord={handleAddFormOpen} />
                        ),
                }}
            />
        </>
    );
};
