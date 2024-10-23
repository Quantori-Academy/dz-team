import { useMemo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { SupportedValue } from "utils/formatters";

type GridProps = {
    rows: Array<Record<string, SupportedValue>>;
    headers: Array<{ field: string; headerName: string }>;
};
export const Grid = ({ rows, headers }: GridProps) => {
    const columns = useMemo(() => {
        const editColumn = {
            field: "actions",
            headerName: "Edit",
            width: 200,
            sortable: false,
            filterable: false,
            renderCell: () => (
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={() => alert("Edit item:")}
                    color="inherit"
                />
            ),
        };
        return [...headers, editColumn];
    }, [headers]);
    return <DataGrid rows={rows} columns={columns} />;
};
