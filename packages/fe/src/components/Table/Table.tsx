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

import { Material } from "stores/materials";

import { formatCellContent, SupportedValue } from "../../utils/formatters";

interface TableProps {
    data: Material[];
    headers: Array<{ key: string; label: string }>;
    actionLabel?: string;
    onActionClick?: (row: Record<string, SupportedValue>) => void;
}

export const Table = ({ data, headers, actionLabel = "Action", onActionClick }: TableProps) => {
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
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            {headers.map((header) => (
                                <TableCell key={header.key}>
                                    {" "}
                                    {formatCellContent(header.key)}
                                </TableCell>
                            ))}
                            {onActionClick && (
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => onActionClick(item)}
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
