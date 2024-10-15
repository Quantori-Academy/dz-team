import "logger/debug-load";

import { Box, Typography } from "@mui/material";

import { headers, mockData } from "components/pages/Table/mockData";
import { Table } from "components/pages/Table/Table";

export function DevPage() {
    const handleActionClick = () => {
        alert(`click!`);
    };

    return (
        <>
            <Typography variant="h4">Reagents Table</Typography>
            <Box
                sx={{
                    overflow: "auto",
                    width: "100%",
                    display: "table",
                    tableLayout: "fixed",
                }}
            >
                <Table
                    data={mockData}
                    headers={headers}
                    actionLabel="Purchase"
                    onActionClick={handleActionClick}
                />
            </Box>
        </>
    );
}
