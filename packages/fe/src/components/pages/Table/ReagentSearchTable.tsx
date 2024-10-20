import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    MenuItem,
    Pagination,
    Paper,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
    Typography,
} from "@mui/material";

import { Reagent } from "shared/generated/zod";

type Column = {
    id: keyof Reagent;
    label: string;
};

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

const columns: Column[] = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "structure", label: "Structure" },
    { id: "description", label: "Description" },
    { id: "quantity", label: "Quantity" },
    { id: "unit", label: "Unit" },
    { id: "size", label: "Size" },
    { id: "expirationDate", label: "Expiration Date" },
    { id: "storageLocation", label: "Storage Location" },
    { id: "cas", label: "CAS" },
    { id: "producer", label: "Producer" },
    { id: "catalogId", label: "Catalog ID" },
    { id: "catalogLink", label: "Catalog Link" },
    { id: "pricePerUnit", label: "Price Per Unit" },
    { id: "category", label: "Category" },
    { id: "status", label: "Status" },
    { id: "createdAt", label: "Created At" },
    { id: "updatedAt", label: "Updated At" },
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

export const ReagentSearchTable = () => {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(20);
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [storageLocation, setStorageLocation] = useState("");
    const [query, setQuery] = useState("");
    const [searchBy, setSearchBy] = useState<SearchBy>(
        searchableFields.reduce((acc, field) => ({ ...acc, [field]: true }), {} as SearchBy),
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, rowsPerPage, sortBy, sortOrder, category, status, storageLocation, query, searchBy]);

    const fetchData = async () => {
        const searchParams = new URLSearchParams({
            page: page.toString(),
            limit: rowsPerPage.toString(),
            sortBy,
            sortOrder,
            ...(category && { category }),
            ...(status && { status }),
            ...(storageLocation && { storageLocation }),
            ...(query && { query }),
        });

        const searchByKeys = Object.entries(searchBy)
            .filter(([, value]) => value)
            .map(([key]) => key);

        searchByKeys.forEach((key) => {
            searchParams.append("searchBy", key);
        });

        const url = `/api/v1/reagents?${searchParams.toString()}`;

        try {
            const response = await fetch(url);
            // eslint-disable-next-line no-console
            console.log("response:", response);
            const result: { data: Reagent[]; meta: ReagentMeta } = await response.json();
            // eslint-disable-next-line no-console
            console.log("result:", result);
            setResults({
                data: result.data,
                meta: result.meta,
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error fetching data:", error);
        }
    };

    const handleSort = (column: string) => {
        const isAsc = sortBy === column && sortOrder === "asc";
        setSortOrder(isAsc ? "desc" : "asc");
        setSortBy(column);
    };

    const handleSearchByChange = (field: keyof Reagent) => {
        setSearchBy((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: SelectChangeEvent<string>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
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
                                    onChange={() => handleSearchByChange(field)}
                                    name={field}
                                />
                            }
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                        />
                    ))}
                </Box>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="reagent table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id}>
                                    <TableSortLabel
                                        active={sortBy === column.id}
                                        direction={sortBy === column.id ? sortOrder : "asc"}
                                        onClick={() => handleSort(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.data.map((row) => (
                            <TableRow key={row.id}>
                                {columns.map((column) => (
                                    <TableCell key={column.id}>
                                        {row[column.id] != null
                                            ? row[column.id]?.toString()
                                            : "N/A"}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box
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
                <Select
                    value={rowsPerPage.toString()}
                    onChange={handleChangeRowsPerPage}
                    sx={{ minWidth: 120 }}
                >
                    {[5, 10, 20, 50].map((option) => (
                        <MenuItem key={option} value={option.toString()}>
                            {" "}
                            {option} per page
                        </MenuItem>
                    ))}
                </Select>
                <Pagination
                    count={results.meta.totalPages}
                    page={results.meta.currentPage}
                    onChange={handleChangePage}
                    color="primary"
                    showFirstButton
                    showLastButton
                />
            </Box>
        </Box>
    );
};
