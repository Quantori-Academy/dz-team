/* eslint-disable react/prop-types */
import "./TableComponent.css";

import {
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
        <TableContainer component={Paper} style={{ maxHeight: "400px", overflowX: "auto" }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
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
                                    sx={{
                                        minWidth:
                                            header.key === "quantityLeft" ||
                                            header.key === "storageLocation"
                                                ? "150px"
                                                : "auto",
                                    }}
                                >
                                    {/* {row[header.key]} */}
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
    );
};

export default TableComponent;
