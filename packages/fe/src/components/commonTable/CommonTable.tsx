import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { TextField } from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridPaginationModel,
    GridSortModel,
    GridValidRowModel,
} from "@mui/x-data-grid";
import { z } from "zod";

import { search } from "api/search";
import { AddRecord } from "components/dataGrid/Addrecord";

type FetchResponseType<T> = {
    data: T[];
    meta: {
        currentPage: number;
        totalPages: number;
        totalCount: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
};

type GridProps<T extends GridValidRowModel> = {
    columns: GridColDef<T>[];
    url: string;
    schema: z.ZodType<T>;
    searchBy: Record<string, boolean>;
    onRowClick?: (row: T) => void;
    onAdd?: () => void;
    addButtonText?: string;
};

export interface CommonTableRef {
    refresh: () => void;
}
const fetchRows = async <T extends GridValidRowModel>({
    url,
    schema,
    searchBy,
    pagination,
    sort,
    query,
    setLoading,
    setResult,
}: {
    url: string;
    schema: z.ZodType<T>;
    searchBy: Record<string, boolean>;
    pagination: GridPaginationModel;
    sort: GridSortModel;
    query: string;
    setLoading: (loading: boolean) => void;
    setResult: (result: FetchResponseType<T>) => void;
}) => {
    setLoading(true);
    try {
        const result = await search({
            url,
            schema,
            searchBy,
            page: pagination.page,
            pageSize: pagination.pageSize,
            sortBy: sort[0]?.field || "createdAt",
            sortOrder: sort[0]?.sort || "asc",
            query,
        });
        setResult(result);
    } catch (error) {
        dev.error("Failed to fetch data:", error);
    } finally {
        setLoading(false);
    }
};
export const CommonTable = forwardRef(
    <T extends GridValidRowModel>(
        { columns, url, schema, searchBy, onRowClick, onAdd, addButtonText = "ADD" }: GridProps<T>,
        ref: React.Ref<CommonTableRef>,
    ) => {
        const [result, setResult] = useState<FetchResponseType<T>>({
            data: [],
            meta: {
                currentPage: 1,
                totalPages: 1,
                totalCount: 0,
                hasNextPage: false,
                hasPreviousPage: false,
            },
        });
        const [loading, setLoading] = useState<boolean>(false);
        const [pagination, setPagination] = useState<GridPaginationModel>({
            page: 0,
            pageSize: 25,
        });
        const [sort, setSort] = useState<GridSortModel>([
            {
                field: "name",
                sort: "asc",
            },
        ]);
        const [query, setQuery] = useState<string>("");

        useImperativeHandle(ref, () => ({
            refresh: () => {
                fetchRows({
                    url,
                    schema,
                    searchBy,
                    pagination,
                    sort,
                    query,
                    setLoading,
                    setResult,
                });
            },
        }));
        useEffect(() => {
            fetchRows({
                url,
                schema,
                searchBy,
                pagination,
                sort,
                query,
                setLoading,
                setResult,
            });
        }, [pagination.page, pagination.pageSize, sort, query, url, schema, searchBy, pagination]);

        return (
            <>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    sx={{ minWidth: 200, mt: 2 }}
                />

                <DataGrid
                    slots={{
                        toolbar: onAdd
                            ? () => <AddRecord buttonLabel={addButtonText} onAddRecord={onAdd} />
                            : undefined,
                    }}
                    rows={result.data}
                    columns={columns}
                    paginationModel={pagination}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    onPaginationModelChange={setPagination}
                    rowCount={result.meta.totalCount}
                    paginationMode="server"
                    onSortModelChange={setSort}
                    sortingOrder={["asc", "desc"]}
                    sortingMode="server"
                    filterMode="server"
                    loading={loading}
                    onRowClick={(params) => onRowClick?.(params.row as T)}
                    disableColumnFilter
                    sx={{ mt: 2, minHeight: 300 }}
                />
            </>
        );
    },
);
CommonTable.displayName = "CommonTable";
