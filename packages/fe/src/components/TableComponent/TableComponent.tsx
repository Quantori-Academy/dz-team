/* eslint-disable react/prop-types */
import "./TableComponent.css";

import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
} from "@mui/material";

export interface RowData {
    id: number;
    name: string;
    category: "Reagent" | "Sample";
    structure: string;
    description: string;
    quantityLeft: number;
    storageLocation: string;
}

interface TableProps {
    data: RowData[];
    headers: Array<{ key: keyof RowData | "action"; label: string }>;
}

const TableComponent: React.FC<TableProps> = ({ data, headers }) => {
    return (
        <div className="App">
            <Box sx={{ overflow: "auto" }}>
                <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                    <TableContainer
                        component={Paper}
                        style={{ maxHeight: "400px", overflowX: "auto" }}
                        className="table-container"
                    >
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow className="table-header">
                                    {headers.map((header) => (
                                        <TableCell key={header.key}>
                                            <TableSortLabel>{header.label}</TableSortLabel>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        {headers.map((header) => (
                                            <TableCell
                                                key={header.key}
                                                className="table-cell"
                                                sx={{
                                                    minWidth:
                                                        header.key === "name" ||
                                                        header.key === "quantityLeft" ||
                                                        header.key === "storageLocation"
                                                            ? "150px"
                                                            : "auto",
                                                }}
                                            >
                                                {header.key === "action" ? (
                                                    <Button
                                                        variant="outlined"
                                                        onClick={() => alert(`Editing ${row.name}`)}
                                                    >
                                                        Edit
                                                    </Button>
                                                ) : (
                                                    row[header.key]
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </div>
    );
};

export default TableComponent;
