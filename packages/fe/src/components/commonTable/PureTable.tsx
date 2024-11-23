import {
    DataGrid,
    GridColDef,
    GridPaginationModel,
    GridRowParams,
    GridSortModel,
    GridValidRowModel,
} from "@mui/x-data-grid";

type PureTableProps<T extends GridValidRowModel> = {
    columns: GridColDef<T>[];
    rows: T[];
    paginationModel: GridPaginationModel;
    onPaginationModelChange: (pagination: GridPaginationModel) => void;
    rowCount: number;
    loading: boolean;
    onSortModelChange: (sort: GridSortModel) => void;
    onRowClick?: (row: T) => void;
    addButton?: React.ReactNode;
};

export const PureTable = <T extends GridValidRowModel>({
    columns,
    rows,
    paginationModel,
    onPaginationModelChange,
    rowCount,
    loading,
    onSortModelChange,
    onRowClick,
    addButton,
}: PureTableProps<T>) => {
    return (
        <>
            <DataGrid
                slots={{
                    toolbar: addButton ? () => addButton : undefined,
                }}
                rows={rows}
                columns={columns}
                paginationModel={paginationModel}
                pageSizeOptions={[5, 10, 25, 50, 100]}
                onPaginationModelChange={onPaginationModelChange}
                rowCount={rowCount}
                paginationMode="server"
                onSortModelChange={onSortModelChange}
                sortingOrder={["asc", "desc"]}
                sortingMode="server"
                filterMode="server"
                loading={loading}
                onRowClick={(params: GridRowParams<T>) => onRowClick?.(params.row)}
                disableColumnFilter
                sx={{ mt: 2, minHeight: 300 }}
            />
        </>
    );
};
