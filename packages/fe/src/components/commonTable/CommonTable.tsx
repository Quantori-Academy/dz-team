import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Badge, IconButton, TextField } from "@mui/material";
import {
    GridColDef,
    GridPaginationModel,
    GridSortModel,
    GridValidRowModel,
} from "@mui/x-data-grid";
import { z } from "zod";

import { search } from "api/search";
import { AddRecord } from "components/dataGrid/Addrecord";

import { PureTable } from "./PureTable";

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
    iconProps?: {
        badgeContent: number;
        color: "default" | "primary" | "secondary";
        onClick: () => void;
    };
    icon?: React.ReactNode;
    rows?: T[];
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
    if (!url) return;
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
// TODO: search doesnt function for rows but function for url

/**
 * CommonTable component is a wrapper around MUI DataGrid component with server-side pagination, sorting, and filtering.
 * Requires a ref to be passed to the component to be able to refresh the table data.
 * @param columns - Array of MUI GridColDef objects - see [MUI DataGrid docs](https://mui.com/x/api/data-grid/grid-col-def/)
 * @param url - API endpoint for fetching table data
 * @param schema - Zod schema used to validate the response data (preferably from [`shared` package](../../../../shared))
 * @param onRowClick - Callback function that is triggered when a row is clicked (commonly navigation to a detailed view page based on the row’s id)
 * @param searchBy - Object defining which fields can be searched
 * @param onAdd - Callback function for the add button; button is shown only if this prop is provided
 * @param addButtonText - Custom text for the add button, defaulting to "ADD"
 * @example
 * ```tsx
 * <CommonTable<TestType>
 *    columns={[
 *       { field: "name", headerName: "Name", width: 150 },
 *       { field: "inStock", headerName: "In stock?" },
 *       ]}
 *      url={`${base}/api/v1/test`}
 *      schema={z.object({
 *          id: z.string(),
 *          name: z.number(),
 *          inStock: z.boolean(),
 *      })}
 *      searchBy={{
 *        name: true,
 *      }}
 *      onRowClick={(row)=>openDetailedView(row.id)}
 *      onAdd={handleAdd}
 *  />
 * ```
 */
export const CommonTable: ForwardRefWithGenerics = forwardRef(
    <T extends GridValidRowModel>(
        {
            columns,
            url,
            schema,
            searchBy,
            onRowClick,
            onAdd,
            addButtonText = "ADD",
            icon,
            iconProps,
            rows,
        }: GridProps<T>,
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
        const [sort, setSort] = useState<GridSortModel>([]);
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
            if (url) {
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
            } else if (rows) {
                setResult({
                    data: rows,
                    meta: {
                        currentPage: 1,
                        totalPages: 1,
                        totalCount: rows.length,
                        hasNextPage: false,
                        hasPreviousPage: false,
                    },
                });
            }
        }, [
            pagination.page,
            pagination.pageSize,
            sort,
            query,
            url,
            schema,
            searchBy,
            pagination,
            rows,
        ]);

        return (
            <>
                {icon && iconProps && (
                    <IconButton onClick={iconProps.onClick}>
                        <Badge badgeContent={iconProps.badgeContent} color={iconProps.color}>
                            {icon}
                        </Badge>
                    </IconButton>
                )}
                <TextField
                    label="Search"
                    variant="outlined"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    sx={{ minWidth: 200, mt: 2 }}
                />
                <PureTable
                    columns={columns}
                    rows={result.data}
                    paginationModel={pagination}
                    onPaginationModelChange={setPagination}
                    rowCount={result.meta.totalCount}
                    loading={loading}
                    onSortModelChange={setSort}
                    onRowClick={onRowClick}
                    addButton={
                        onAdd ? (
                            <AddRecord buttonLabel={addButtonText} onAddRecord={onAdd} />
                        ) : undefined
                    }
                />
            </>
        );
    },
);
CommonTable.displayName = "CommonTable";
