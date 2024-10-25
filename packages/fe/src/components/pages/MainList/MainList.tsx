import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridSortModel, GridToolbar } from "@mui/x-data-grid";

import { Reagent } from "shared/generated/zod";

type ResponseMeta = {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

type ResponseState = {
    data: Reagent[];
    meta: ResponseMeta;
};

type SearchBy = {
    [key in keyof Reagent]?: boolean;
};

type GridSortingDirection = "asc" | "desc";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, sortable: false },
    { field: "name", headerName: "Name", width: 150 },
    { field: "structure", headerName: "Structure", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 110 },
    { field: "unit", headerName: "Unit", width: 100, sortable: false },
    { field: "size", headerName: "Size", width: 100, sortable: false },
    { field: "expirationDate", headerName: "Expiration Date", width: 150 },
    { field: "storageLocation", headerName: "Storage Location", width: 150 },
    { field: "cas", headerName: "CAS", width: 120 },
    { field: "producer", headerName: "Producer", width: 150 },
    { field: "catalogId", headerName: "Catalog ID", width: 120 },
    { field: "catalogLink", headerName: "Catalog Link", width: 150 },
    { field: "pricePerUnit", headerName: "Price Per Unit", width: 150 },
    { field: "category", headerName: "Category", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "createdAt", headerName: "Created At", width: 150 },
    { field: "updatedAt", headerName: "Updated At", width: 150 },
];

// currently requires server-side support
const categoryOptions = ["reagent", "sample"];

// to be discussed
const statusOptions = ["available", "low_stock", "out_of_stock", "ordered", "not_available"];

const searchableFields: (keyof Reagent)[] = [
    "name",
    "description",
    "structure",
    "producer",
    "cas",
    "catalogId",
    "catalogLink",
];

export const MainList = () => {
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 25,
        page: 0,
    });
    const [sortModel, setSortModel] = useState<GridSortModel>([
        {
            field: "name",
            sort: "asc",
        },
    ]);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [storageLocation, setStorageLocation] = useState("");
    const [query, setQuery] = useState("");
    const [searchBy, setSearchBy] = useState<SearchBy>(
        searchableFields.reduce((acc, field) => ({ ...acc, [field]: true }), {} as SearchBy)
    );
    const [results, setResults] = useState<ResponseState>({
        data: [],
        meta: {
            currentPage: 1,
            totalPages: 1,
            totalCount: 0,
            hasNextPage: false,
            hasPreviousPage: false,
        },
    });

    const fetchHookDeps = [
        paginationModel.pageSize,
        paginationModel.page,
        sortModel[0].field,
        sortModel[0].sort,
        category,
        status,
        storageLocation,
        query,
        searchBy,
    ];
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, fetchHookDeps);

    const fetchData = async () => {
        const searchParams = new URLSearchParams({
            page: (paginationModel.page + 1).toString(),
            limit: paginationModel.pageSize.toString(),
            sortBy: sortModel[0].field,
            sortOrder: sortModel[0].sort as GridSortingDirection, // enforce using this type, without "null" and "undefined" of MUI GridSortDirection
            ...(category && { category }),
            ...(status && { status }),
            ...(storageLocation && { storageLocation }),
            ...(query && { query }),
        });

        const searchByKeys = Object.entries(searchBy)
            .filter(([_, value]) => value)
            .map(([key]) => key);

        searchByKeys.forEach((key) => {
            searchParams.append("searchBy", key);
        });

        // 'base' url should be used instead of this one
        const url = `/api/v1/reagents?${searchParams.toString()}`;

        try {
            setLoading(true);
            const response = await fetch(url);
            const result: { data: Reagent[]; meta: ResponseMeta } = await response.json();
            setResults({
                data: result.data,
                meta: result.meta,
            });
        } catch (error) {
            dev.error("Error fetching reagents and samples data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePaginationMetaChange = (currentPage: number) => {
        setPaginationModel({ ...paginationModel, page: currentPage });
    };

    const handleRowCountChange = (totalPages: number) => {
        setPaginationModel({ ...paginationModel, pageSize: totalPages });
    };

    const handleSortModelChange = (sortModel: GridSortModel) => {
        setSortModel(sortModel);
    };

    return (
        <Box sx={{ width: "100%", p: 2 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    sx={{ minWidth: 200 }}
                />
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    displayEmpty
                    sx={{ minWidth: 200 }}
                >
                    <MenuItem value="">All Categories</MenuItem>
                    {categoryOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option.toUpperCase()}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    displayEmpty
                    sx={{ minWidth: 200 }}
                >
                    <MenuItem value="">All Statuses</MenuItem>
                    {statusOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    label="Storage Location"
                    variant="outlined"
                    value={storageLocation}
                    onChange={(e) => setStorageLocation(e.target.value)}
                    sx={{ minWidth: 200 }}
                />
                <Button variant="contained" onClick={fetchData}>
                    Search
                </Button>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Search in:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    {searchableFields.map((field) => (
                        <FormControlLabel
                            key={field}
                            control={
                                <Checkbox
                                    checked={searchBy[field]}
                                    onChange={() =>
                                        setSearchBy((prev) => ({ ...prev, [field]: !prev[field] }))
                                    }
                                    name={field}
                                />
                            }
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                        />
                    ))}
                </Box>
            </Box>

            <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    initialState={{
                        sorting: {
                            sortModel,
                        },
                    }}
                    rows={results.data}
                    columns={columns}
                    slots={{ toolbar: GridToolbar }}
                    checkboxSelection
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    paginationModel={paginationModel}
                    paginationMode="server"
                    onPaginationModelChange={setPaginationModel}
                    rowCount={results.meta?.totalCount}
                    onPaginationMetaChange={() =>
                        handlePaginationMetaChange(results.meta.currentPage)
                    }
                    onRowCountChange={() => handleRowCountChange(results.meta.totalPages)}
                    sortingMode="server"
                    onSortModelChange={handleSortModelChange}
                    sortingOrder={["asc", "desc"]}
                    loading={loading}
                    showColumnVerticalBorder
                />
            </Box>
        </Box>
    );
};
