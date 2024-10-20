import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";

import { SupportedValue } from "utils/formatters";

import { AddItem } from "./AddItem";

type DataGridTypes = {
    data: Array<Record<string, SupportedValue>>;
    headers: Array<{ field: string; headername: string }>;
};

export const DataGridTable = ({ data, headers }: DataGridTypes) => {
    const editColumn = {
        field: "actions",
        headerName: "Edit",
        width: 80,
        sortable: false,
        filterable: false,
        renderCell: () => (
            <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                onClick={() => alert("Edit item")}
                color="inherit"
            />
        ),
    };
    const columns = [...headers, editColumn];

    return (
        <Box sx={{ width: "100%" }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                slots={{
                    toolbar: AddItem,
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
};
