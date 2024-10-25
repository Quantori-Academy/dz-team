import { useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { deleteUserFx } from "stores/users";
import { SupportedValue } from "utils/formatters";

import { AddRecord } from "./Addrecord";

type GridProps = {
    rows: Array<Record<string, SupportedValue>>;
    headers: Array<{ field: string; headerName: string }>;
    handleAddRecord: () => void;
};
export const Grid = ({ rows, headers, handleAddRecord }: GridProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleDeleteClick = (id: string) => {
        deleteUserFx(id);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };
    /* eslint-disable @typescript-eslint/no-base-to-string */
    const filteredRows = rows.filter((row) =>
        Object.values(row).some(
            (value) => value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
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
                    ,
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
                placeholder="Search by name, username, or email"
                value={searchQuery}
                onChange={handleSearch}
            />
            <DataGrid
                rows={filteredRows}
                rowHeight={60}
                columns={columns}
                slots={{
                    toolbar: () => <AddRecord onAdd={handleAddRecord} />,
                }}
            />
        </>
    );
};
