import "./App.css";
import "./logger/debug-load";

import { useEffect, useState } from "react";
import { useGate, useUnit } from "effector-react";

import { fetchMolCount, fetchMolPost, fetchServerConnection } from "api/apiCalls";
import { $isLoading } from "api/loadingState";
import { config } from "config";
import { $materials, AppGate } from "stores";

const logError = (err: unknown) => dev.info("{!offline}", err);

import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import { theme } from "theme";

function App() {
    useGate(AppGate);
    const materials = useUnit($materials);
    const isLoading = useUnit($isLoading);
    const [count, setCount] = useState(0);
    const [connectionState, setConnectionState] = useState("...");
    const [molCount, setMolCount] = useState(0);

    useEffect(() => {
        fetchServerConnection().then(setConnectionState).catch(logError);
        fetchMolCount().then(setMolCount).catch(logError);
    }, []);

    const handlePost = () => {
        fetchMolPost().then(handleUpdateMolCount).catch(logError);
    };

    const handleUpdateMolCount = () => {
        fetchMolCount().then(setMolCount).catch(logError);
    };
    return (
        <ThemeProvider theme={theme}>
            <Box>{isLoading ? "TEST LOADING..." : null}</Box>
            <Typography variant="h1">Vite + React</Typography>
            <Typography variant="h3">
                {config.isProd ? "Production build" : "Not production build"}
            </Typography>
            <Box sx={{ p: "2em" }}>
                <Button variant="outlined" onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </Button>
                <Typography>App runs ok!</Typography>
                <Typography>{`${materials?.length ?? 0} materials loaded`}</Typography>
            </Box>
            <Typography>Server connection is {connectionState}</Typography>
            <hr />
            <Typography variant="h2">DB</Typography>
            <Typography>registered molecules: {molCount}</Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                }}
            >
                <Button variant="outlined" onClick={handleUpdateMolCount}>
                    update molecules count
                </Button>
                <Button variant="outlined" onClick={handlePost}>
                    register new molecule to DB
                </Button>
            </Box>
        </ThemeProvider>
    );
}

export default App;
