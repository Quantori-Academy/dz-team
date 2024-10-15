import {
    Button,
    Paper,
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
} from "@mui/material";

import { formatCellContent, SupportedValue } from "utils/formatters";

interface TableProps {
    data: Array<Record<string, SupportedValue>>;
    headers: Array<{ key: string; label: string }>;
    sortedMaterials: { field: string | null; order: "asc" | "desc" | null };
    handleSortRequest: (field: string) => void;
    actionLabel?: string;
    onActionClick?: (row: Record<string, SupportedValue>) => void;
}

export const Table = ({
    data,
    sortedMaterials,
    handleSortRequest,
    headers,
    actionLabel = "Action",
    onActionClick,
}: TableProps) => {
    const headerStyles = {
        background: "linear-gradient(0deg, #BFBFBF, #BFBFBF), #BFBFBF",
        color: "#000000",
        fontFamily: "Inter, sans-serif",
        fontWeight: 600,
        fontSize: "14px",
        lineHeight: "17px",
    };

    return (
        <TableContainer
            component={Paper}
            sx={{
                overflowX: "auto",
            }}
        >
            <MuiTable stickyHeader>
                <TableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <TableCell key={header.key} sx={headerStyles}>
                                <TableSortLabel
                                    active={sortedMaterials.field === header.key}
                                    direction={sortedMaterials.order}
                                    onClick={() => handleSortRequest(header.key)}
                                >
                                    {header.label}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                        {onActionClick && <TableCell sx={headerStyles}>{actionLabel}</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {headers.map((header) => (
                                <TableCell key={header.key}>
                                    {formatCellContent(row[header.key])}
                                </TableCell>
                            ))}
                            {onActionClick && (
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => onActionClick(row)}
                                    >
                                        {actionLabel}
                                    </Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </MuiTable>
        </TableContainer>
    );
};
