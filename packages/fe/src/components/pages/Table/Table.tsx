import {
    Button,
    Paper,
    Table as MuiTable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

import { formatCellContent, SupportedValue } from "utils/formatters";

interface TableProps {
    data: Array<Record<string, SupportedValue>>;
    headers: Array<{ key: string; label: string }>;
    actionLabel?: string;
    onActionClick?: (row: Record<string, SupportedValue>) => void;
    onRowClick?: (row: { id: string }) => void;
}

export const Table = ({
    data,
    headers,
    actionLabel = "Action",
    onActionClick,
    onRowClick,
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
                                {header.label}
                            </TableCell>
                        ))}
                        {onActionClick && <TableCell sx={headerStyles}>{actionLabel}</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow
                            key={typeof row.id === "string" ? row.id : `${rowIndex}`}
                            onClick={() => onRowClick?.(row as { id: string })}
                            sx={{ cursor: "pointer" }}
                        >
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
