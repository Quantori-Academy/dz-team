import { DataGrid } from "@mui/x-data-grid";

import { SupportedValue } from "utils/formatters";

type GridProps = {
    rows: Array<Record<string, SupportedValue>>;
    headers: Array<{ field: string; headerName: string }>;
};
export const Grid = ({ rows, headers }: GridProps) => {
    return (
        <DataGrid
            rows={rows}
            rowHeight={60}
            columns={headers}
            disableRowSelectionOnClick
            pageSizeOptions={[5, 15, 25, 50]}
            // getRowId={(row) => row.id}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
            }}
        />
    );
};
