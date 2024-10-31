import { useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { SupportedValue } from "utils/formatters";

import { AddRecord } from "./Addrecord";

type GridProps = {
    rows: Array<Record<string, SupportedValue>>;
    headers: Array<{ field: string; headerName: string }>;
    onAddRecord: () => void;
    addRecordLabel: string;
    placeholder?: string;
};
export const ReusableGrid = ({
    rows,
    headers,
    onAddRecord,
    addRecordLabel,
    placeholder,
}: GridProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };
    /* eslint-disable @typescript-eslint/no-base-to-string */
    const filteredRows = rows.filter((row) =>
        Object.values(row).some(
            (value) => value && value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );

    const textField = {
        width: "350px",
    };

    const columns = useMemo(() => {
        const editColumn = {
            field: "actions",
            headerName: "actions",
            width: 100,
            sortable: false,
            filterable: false,
            renderCell: (_params: { row: { id: string } }) => (
                <>
                    <GridActionsCellItem icon={<EditIcon />} label="Edit" color="inherit" />
                    <GridActionsCellItem icon={<DeleteIcon />} label="Delete" color="inherit" />,
                </>
            ),
        };
        return [...headers, editColumn];
    }, [headers]);

    return (
        <>
            <TextField
                sx={textField}
                variant="outlined"
                placeholder={placeholder}
                value={searchQuery}
                onChange={handleSearch}
            />
            <DataGrid
                rows={filteredRows}
                rowHeight={60}
                columns={columns}
                slots={{
                    toolbar: () => <AddRecord onAdd={onAddRecord} label={addRecordLabel} />,
                }}
            />
        </>
    );
};
