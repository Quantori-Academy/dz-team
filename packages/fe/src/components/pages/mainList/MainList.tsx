import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridSortModel, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "@tanstack/react-router";
import { useGate, useUnit } from "effector-react";

import {
    $loading,
    $pagination,
    $query,
    $reagents,
    $searchBy,
    $sort,
    MainListGate,
    search,
    searchableFields,
    setPagination,
    setQuery,
    setSearchBy,
    setSort,
} from "stores/reagents";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90, sortable: false },
    { field: "name", headerName: "Name", width: 150 },
    { field: "structure", headerName: "Structure", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 110 },
    { field: "unit", headerName: "Unit", width: 100, sortable: false },
    { field: "expirationDate", headerName: "Expiration Date", width: 150 },
    { field: "cas", headerName: "CAS", width: 120 },
    { field: "producer", headerName: "Producer", width: 150 },
    { field: "catalogId", headerName: "Catalog ID", width: 120 },
    { field: "catalogLink", headerName: "Catalog Link", width: 150 },
    { field: "pricePerUnit", headerName: "Price Per Unit", width: 150 },
    { field: "category", headerName: "Category", width: 120 },
    { field: "createdAt", headerName: "Created At", width: 150 },
    { field: "updatedAt", headerName: "Updated At", width: 150 },
];

export const MainList = () => {
    useGate(MainListGate);

    const navigate = useNavigate();

    const setPaginationModel = useUnit(setPagination);
    const paginationModel = useUnit($pagination);

    const setSortModel = useUnit(setSort);
    const sortModel = useUnit($sort);

    const setQueryModel = useUnit(setQuery);
    const queryModel = useUnit($query);

    const setSearchByModel = useUnit(setSearchBy);
    const searchByModel = useUnit($searchBy);

    const loading = useUnit($loading);

    const searchHandleClick = useUnit(search);

    const result = useUnit($reagents);

    const handlePaginationMetaChange = (currentPage: number) => {
        setPaginationModel({ ...paginationModel, page: currentPage });
    };

    const handleRowCountChange = (totalPages: number) => {
        setPaginationModel({ ...paginationModel, pageSize: totalPages });
    };

    const handleSortModelChange = (sortModel: GridSortModel) => {
        setSortModel(sortModel);
    };

    const handleRowClick = (params: { row: { id: string } }) => {
        navigate({ to: `/reagents/${params.row.id}`, replace: false });
    };

    return (
        <Box sx={{ width: "100%", p: 2 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={queryModel}
                    onChange={(e) => setQueryModel(e.target.value)}
                    sx={{ minWidth: 200 }}
                />
                <Button
                    variant="contained"
                    onClick={() => {
                        searchHandleClick();
                    }}
                >
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
                                    checked={searchByModel[field]}
                                    onChange={() =>
                                        setSearchByModel({
                                            ...searchByModel,
                                            [field]: !searchByModel[field],
                                        })
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
                    rows={result.data}
                    columns={columns}
                    slots={{ toolbar: GridToolbar }}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    paginationModel={paginationModel}
                    paginationMode="server"
                    onPaginationModelChange={setPaginationModel}
                    rowCount={result.meta?.totalCount}
                    onPaginationMetaChange={() =>
                        handlePaginationMetaChange(result.meta.currentPage)
                    }
                    onRowCountChange={() => handleRowCountChange(result.meta.totalPages)}
                    sortingMode="server"
                    onSortModelChange={handleSortModelChange}
                    sortingOrder={["asc", "desc"]}
                    loading={loading}
                    showColumnVerticalBorder
                    disableColumnFilter
                    onRowClick={handleRowClick}
                />
            </Box>
        </Box>
    );
};
