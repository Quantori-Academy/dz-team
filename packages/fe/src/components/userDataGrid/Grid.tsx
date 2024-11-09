import { useCallback, useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import PageviewIcon from "@mui/icons-material/Pageview";
import { Box, Modal, TextField, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "@tanstack/react-router";

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
type RowDataType = {
    id: string;
    room: string;
    name: string;
    description: string;
};

export const Grid = ({ rows, headers, recordType }: GridProps) => {
    const { isAdmin } = useSession();

    const navigate = useNavigate();
    const { handleDeleteClick } = useUserForm({});

    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);

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

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleAddUserOpen = () => {
        setModalOpen(true);
    };

    const handleADdStorageOpen = () => {
        alert("new storage");
    };

    const handleRowClick = useCallback(
        (id: string) => {
            fetchDetailedStorageFx(id);
            navigate({ to: `/storageDetail`, replace: false });
        },
        [navigate],
    );

    const columns = useMemo(() => {
        const editColumn = {
            field: "actions",
            headerName: "Actions",
            width: 100,

            renderCell: (params: { row: RowDataType }) => (
                <>
                    {recordType !== "detailedReagents" && !isAdmin && (
                        <GridActionsCellItem
                            icon={<PageviewIcon />}
                            label="View"
                            color="inherit"
                            onClick={() => handleRowClick(params.row?.id)}
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
                                onClick={() => handleDeleteClick(params.row.id)}
                                color="inherit"
                            />
                        </>
                    )}
                </>
            ),
        };
        return [...headers, editColumn];
    }, [headers, handleDeleteClick, isAdmin, handleRowClick, recordType]);

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
                    toolbar: isAdmin
                        ? () =>
                              recordType === "user" ? (
                                  <AddRecord
                                      buttonLabel="Add New User"
                                      onAddRecord={handleAddUserOpen}
                                  />
                              ) : (
                                  <AddRecord
                                      buttonLabel="Add New Storage"
                                      onAddRecord={handleADdStorageOpen}
                                  />
                              )
                        : null,
                }}
            />
            <Modal open={isModalOpen} onClose={handleModalClose}>
                <Box
                    sx={{
                        width: "500px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 4,
                        margin: "auto",
                        marginTop: "10%",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        borderRadius: 1,
                    }}
                >
                    {recordType === "user" ? (
                        <AddUserForm onClose={handleModalClose} />
                    ) : (
                        <Typography>storage form </Typography>
                    )}
                </Box>
            </Modal>
        </>
    );
};
