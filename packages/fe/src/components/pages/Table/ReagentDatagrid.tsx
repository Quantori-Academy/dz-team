import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    MenuItem,
    // Pagination,
    // Paper,
    Select,
    SelectChangeEvent,
    TextField,
    // Toolbar,
    Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

import { Reagent } from "shared/generated/zod";

type ReagentMeta = {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

type ReagentState = {
    data: Reagent[];
    meta: ReagentMeta;
};

type SearchBy = {
    [key in keyof Reagent]?: boolean;
};

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "structure", headerName: "Structure", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 110 },
    { field: "unit", headerName: "Unit", width: 100 },
    { field: "size", headerName: "Size", width: 100 },
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

const categoryOptions = [
    "organic",
    "inorganic",
    "acidic",
    "basic",
    "oxidizing",
    "reducing",
    "precipitating",
    "complexing",
    "indicator",
    "other",
];

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

export const ReagentDatagrid = () => {
    // const [page, setPage] = useState(1);
    // const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 25,
        page: 0,
    });
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [storageLocation, setStorageLocation] = useState("");
    const [query, setQuery] = useState("");
    const [searchBy, setSearchBy] = useState<SearchBy>(
        searchableFields.reduce((acc, field) => ({ ...acc, [field]: true }), {} as SearchBy)
    );
    const [results, setResults] = useState<ReagentState>({
        data: [],
        meta: {
            currentPage: 1,
            totalPages: 1,
            totalCount: 0,
            hasNextPage: false,
            hasPreviousPage: false,
        },
    });

    useEffect(() => {
        fetchData();

        // }, [page, rowsPerPage, category, status, storageLocation, query, searchBy]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        paginationModel.pageSize,
        paginationModel.page,
        category,
        status,
        storageLocation,
        query,
        searchBy,
    ]);

    const fetchData = async () => {
        const searchParams = new URLSearchParams({
            // page: page.toString(),
            // limit: rowsPerPage.toString(),
            page: (paginationModel.page + 1).toString(),
            limit: paginationModel.pageSize.toString(),
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

        const url = `/api/v1/reagents?${searchParams.toString()}`;

        try {
            setLoading(true);
            const response = await fetch(url);
            const result: { data: Reagent[]; meta: ReagentMeta } = await response.json();
            setResults({
                data: result.data,
                meta: result.meta,
            });

            // setData(result.data);
            // setTotalCount(result.meta.totalCount);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // const handleChangePage = (newPage: number) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event: SelectChangeEvent<string>) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(1);
    // };

    const handleChangePage = (newPage: number) => {
        setPaginationModel({ ...paginationModel, page: newPage });
    };

    const handleChangeRowsPerPage = (event: SelectChangeEvent<string>) => {
        setPaginationModel({ ...paginationModel, pageSize: parseInt(event.target.value, 10) });
        // setPaginationModel({page: 1, pageSize: parseInt(event.target.value, 10)});
        // setPage(1);
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
                            {option}
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
                    //   pagination
                    rows={results.data}
                    columns={columns}
                    slots={{ toolbar: GridToolbar }}
                    checkboxSelection
                    // pageSize={rowsPerPage}
                    // pageSize={paginationModel.pageSize}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    paginationModel={paginationModel}
                    paginationMode="server"
                    onPaginationModelChange={setPaginationModel}
                    rowCount={results.meta?.totalCount}
                    // onPageChange={handleChangePage}
                    onPageChange={() => handleChangePage(results.meta.currentPage)}
                    onPageSizeChange={handleChangeRowsPerPage}
                    // getRowId={(row) => row.id}
                    disableSelectionOnClick
                    // disableRowSelectionOnClick
                    // pagination={ paginationModel}
                    loading={loading}
                    // initialState={{
                    // //     ...results.data,
                    //     pagination: { paginationModel },
                    // }}
                />
            </Box>

            {/* <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                }}
            >
                <Typography variant="body2">
                    Showing {(page - 1) * rowsPerPage + 1} to{" "}
                    {Math.min(page * rowsPerPage, results.meta.totalCount)} of{" "}
                    {results.meta.totalCount} results
                </Typography>
                <Pagination
                    count={results.meta.totalPages}
                    page={results.meta.currentPage}
                    onChange={handleChangePage}
                    color="primary"
                    showFirstButton
                    showLastButton
                />
            </Box> */}
        </Box>
    );
};
