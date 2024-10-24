import { useMemo } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { deleteUserFx } from "stores/users";
import { SupportedValue } from "utils/formatters";

import { AddRecord } from "./Addrecord";

type GridProps = {
    rows: Array<Record<string, SupportedValue>>;
    headers: Array<{ field: string; headerName: string }>;
};
export const Grid = ({ rows, headers }: GridProps) => {
    const handleDeleteClick = (id: string) => {
        deleteUserFx(id);
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
        <DataGrid
            rows={rows}
            rowHeight={60}
            columns={columns}
            slots={{
                toolbar: AddRecord,
            }}
        />
    );
};
