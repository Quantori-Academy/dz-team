import { useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { CommonModal } from "components/modal/CommonModal";
import { useUserForm } from "hooks/useUserForm";
import { User } from "shared/generated/zod";
import { SupportedValue } from "utils/formatters";

import { AddUserForm } from "../pages/users/AddUserForm";
import { AddRecord } from "./Addrecord";

type GridProps = {
    rows: Array<Record<string, SupportedValue>>;
    headers: Array<{ field: string; headerName: string }>;
};

export const Grid = ({ rows, headers }: GridProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const { handleDeleteClick } = useUserForm({});

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const onSubmit = () => {
        handleClose();
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
            <TextField
                variant="outlined"
                placeholder="Search by name, username, or email"
                value={searchQuery}
                onChange={handleSearch}
                sx={{ width: "350px", marginBottom: "16px" }}
            />
            <DataGrid
                rows={filteredRows as User[]}
                rowHeight={60}
                getRowId={(row: User) =>
                    typeof row.id === "string" || typeof row.id === "number"
                        ? row.id
                        : `${String(row.username ?? "unknown")}-${Math.random()
                              .toString(36)
                              .substring(2, 9)}`
                }
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
                        <AddRecord buttonLabel="Add New User" onAddRecord={handleOpen} />
                    ),
                }}
            />
            <CommonModal
                isOpen={open}
                title={"Add New User"}
                onSubmit={onSubmit}
                onCancel={handleClose}
                submitLabel={"Submit"}
                cancelLabel={"Cancel"}
            >
                <AddUserForm onClose={() => handleClose()} />
            </CommonModal>
        </>
    );
};
