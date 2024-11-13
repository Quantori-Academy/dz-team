import { useMemo, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Box, IconButton, TextField } from "@mui/material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";

import { SupportedValue } from "utils/formatters";

import { AddRecord } from "./Addrecord";

type RowType = Record<string, SupportedValue>;

type GridProps = {
    // rows: Array<Record<string, SupportedValue>>;
    rows: Array<RowType>;
    headers: Array<{ field: string; headerName: string }>;
    onAddRecord?: () => void;
    addRecordLabel?: string;
    placeholder?: string;
    // onRowClick?: (row: any) => void;
    onRowClick?: (row: RowType) => void;
    iconProps?: {
        badgeContent: number;
        color: "default" | "primary" | "secondary";
        onClick: () => void;
    };
};
export const ReusableGrid = ({
    rows,
    headers,
    onAddRecord,
    addRecordLabel,
    placeholder,
    onRowClick,
    iconProps,
}: GridProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };
    /* eslint-disable @typescript-eslint/no-base-to-string */
    const filteredRows = rows.filter((row) =>
        Object.values(row).some(
            (value) => value && value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );

    const columns = useMemo(() => headers, [headers]);
    const textFieldStyle = {
        width: "350px",
        marginRight: "16px",
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <TextField
                    sx={textFieldStyle}
                    variant="outlined"
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={handleSearch}
                />
                {iconProps && (
                    <IconButton onClick={iconProps.onClick}>
                        <Badge badgeContent={iconProps.badgeContent} color={iconProps.color}>
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                )}
            </Box>
            <DataGrid
                rows={filteredRows}
                rowHeight={60}
                columns={columns}
                onRowClick={(params: GridRowParams) =>
                    onRowClick && onRowClick(params.row as RowType)
                }
                getRowClassName={() => "custom-row"}
                sx={{
                    "& .custom-row:hover": {
                        cursor: "pointer",
                    },
                }}
                slots={{
                    toolbar: () => <AddRecord onAdd={onAddRecord} label={addRecordLabel} />,
                }}
            />
        </>
    );
};
