import "logger/debug-load";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { fetchServerConnection } from "api/apiCalls";
// import { headers, mockData } from "components/pages/Table/mockData";
import { ReagentSearchTable } from "components/pages/Table/ReagentSearchTable";
// import { Table } from "components/pages/Table/Table";
import { config } from "config";

const logError = (err: unknown) => dev.info("{!offline}", err);

export function DevPage() {
    const [connectionState, setConnectionState] = useState<string | undefined>("...");

    useEffect(() => {
        fetchServerConnection().then(setConnectionState).catch(logError);
    }, []);

    // const handleActionClick = () => {
    //     alert(`click!`);
    // };

    return (
        <>
            <Box
                sx={{
                    padding: "20px",
                    backgroundColor: "#f1f2f3",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    textAlign: "flex-start",
                    mt: 10,
                    mb: 10,
                }}
            >
                <Typography
                    sx={{
                        color: "#363636",
                        marginBottom: "16px",
                    }}
                >
                    Production build: {config.isProd ? "yes" : "no"}
                </Typography>
                <Typography
                    sx={{
                        color: "#363636",
                    }}
                >
                    Server connection: {connectionState ?? "no"}
                </Typography>
            </Box>
            <Typography variant="h4">Reagents Table</Typography>
            <Box
                sx={{
                    overflow: "auto",
                    width: "100%",
                    display: "table",
                    tableLayout: "fixed",
                }}
            >
                {/* DEMO COMPONENT. FOR REFERENCE ONLY */}
                <ReagentSearchTable />

                {/* <Table
                    data={mockData}
                    headers={headers}
                    actionLabel="Purchase"
                    onActionClick={handleActionClick}
                /> */}
            </Box>
        </>
    );
}
