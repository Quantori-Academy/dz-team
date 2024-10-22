import EditIcon from "@mui/icons-material/Edit";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { SupportedValue } from "utils/formatters";

type DataGridTableProps = {
    data: Array<Record<string, SupportedValue>>;
    headers: Array<{ field: string; headerName: string }>;
};
export const TableGrid = ({ data, headers }: DataGridTableProps) => {
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
    const columns = [...headers, editColumn];
    return <DataGrid rows={data} columns={columns} />;
};
