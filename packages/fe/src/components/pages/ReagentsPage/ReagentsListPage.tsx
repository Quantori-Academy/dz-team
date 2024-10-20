import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useGate } from "effector-react";
import { theme } from "theme";

import { DataGridTable } from "components/gridTable/DataGridTable";
import { columns, rows } from "components/gridTable/MockData";
import { fetchReagentsFx, ReagentsGate } from "stores/reagents";

export const ReagentsListPage = () => {
    useGate(ReagentsGate);

    useEffect(() => {
        fetchReagentsFx();
    }, []);

    return (
        <Box
            sx={{
                width: "100%",
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
            }}
        >
            <Box
                sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px" }}
            >
                <Typography variant="h3" sx={{ color: theme.palette.text.primary }}>
                    Reagents List
                </Typography>
            </Box>
            <DataGridTable data={rows} headers={columns} />
        </Box>
    );
};
