import { useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Box, TextField } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";
import { SupportedValue } from "utils/formatters";

import { AddRecord } from "./Addrecord";

type GridProps = {
    rows: Array<Record<string, SupportedValue>>;
    headers: Array<{ field: string; headerName: string }>;
    searchPlaceholder?: string;
    modalTitle?: string;
    modalContent?: (removeModal?: () => void) => JSX.Element;
    showToolbar?: boolean;
    showSearchField?: boolean;
    addButtonLabel?: string;
    handleDelete?: (id: string) => void;
};

export const Grid = ({
    rows,
    headers,
    searchPlaceholder = "Search...",
    modalTitle = "Add New Record",
    modalContent,
    showToolbar = true,
    showSearchField = true,
    addButtonLabel = "Add New Record",
    handleDelete,
}: GridProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
        setSearchQuery(event.target.value);

    const filteredRows = useMemo(() => {
        if (!searchQuery) return rows;

        return rows.filter((row) =>
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
    }, [rows, searchQuery]);

    const handleAddRecord = async () => {
        if (!modalContent) return;

        await createModal({
            name: "add_record_modal",
            title: modalTitle,
            message: modalContent(removeModal),
        });
        removeModal();
    };

    const columns = useMemo(() => {
        if (!handleDelete) return headers;

        const actionsColumn = {
            field: "actions",
            headerName: "Actions",
            width: 70,
            renderCell: (params: { row: { id: string } }) => (
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    color="inherit"
                    onClick={() => handleDelete(params.row.id)}
                />
            ),
        };

        return [...headers, actionsColumn];
    }, [headers, handleDelete]);

    return (
        <Box>
            {showSearchField && (
                <TextField
                    variant="outlined"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={handleSearch}
                    fullWidth
                    sx={{ paddingBottom: "20px" }}
                />
            )}
            <Box>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    rowHeight={60}
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
                        toolbar: showToolbar
                            ? () => (
                                  <AddRecord
                                      buttonLabel={addButtonLabel}
                                      onAddRecord={handleAddRecord}
                                  />
                              )
                            : undefined,
                    }}
                />
            </Box>
        </Box>
    );
};
