import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { createModal } from "components/modal/createModal";
import { removeModal } from "components/modal/store";
import { SearchField } from "components/pages/users/SearcheField";
import { SupportedValue } from "utils/formatters";

import { AddRecord } from "./Addrecord";

type GridProps = {
    rows: Array<Record<string, SupportedValue>>;
    headers: Array<{ field: string; headerName: string }>;
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
    renderActions?: (row: Record<string, SupportedValue>) => JSX.Element;
    modalTitle?: string;
    modalContent?: JSX.Element;
    onAddRecordSuccess?: () => void;
    showToolbar?: boolean;
    addButtonLabel: string;
};

export const Grid = ({
    rows,
    headers,
    searchPlaceholder = "Search...",
    onSearch,
    renderActions,
    modalTitle = "Add New Record",
    modalContent,
    onAddRecordSuccess,
    showToolbar = true,
    addButtonLabel = "Add New Record",
}: GridProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        onSearch?.(query);
    };

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

        try {
            await createModal({
                name: "add_record_modal",
                title: modalTitle,
                message: modalContent,
            });
            removeModal();
            onAddRecordSuccess?.();
        } catch (_) {
            removeModal();
        }
    };

    const columns = useMemo(() => {
        const actionsColumn = {
            field: "actions",
            headerName: "Actions",
            width: 100,
            renderCell: (params: { row: { id: string } }) =>
                renderActions ? renderActions(params.row) : null,
        };

        return [...headers, actionsColumn];
    }, [headers, renderActions]);

    return (
        <>
            <SearchField
                placeholder={searchPlaceholder}
                searchQuery={searchQuery}
                onSearch={handleSearch}
            />
            <Box sx={{ height: "300px", width: "100%" }}>
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
        </>
    );
};
