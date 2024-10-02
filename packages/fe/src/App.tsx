import "./App.css";
import "./logger/debug-load";

import { useEffect, useState } from "react";
import { useGate, useUnit } from "effector-react";

import { fetchMolCount, fetchMolPost, fetchServerConnection } from "api/apiCalls";
import { config } from "config";
import { $materials, AppGate } from "stores";

import TableComponent, { RowData } from "./components/TableComponent/TableComponent";

const logError = (err: unknown) => dev.info("{!offline}", err);

import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import { theme } from "theme";

function App() {
    useGate(AppGate);
    const materials = useUnit($materials);
    const [count, setCount] = useState(0);
    const [connectionState, setConnectionState] = useState("...");
    const [molCount, setMolCount] = useState("0");

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

    const mockData: RowData[] = [
        {
            id: 1,
            name: "Reagent A",
            category: "Reagent",
            structure: "",
            description: "High purity",
            quantityLeft: 50,
            storageLocation: "Shelf 1",
        },
        {
            id: 2,
            name: "Reagent B",
            category: "Reagent",
            structure: "",
            description: "Acidic reagent",
            quantityLeft: 30,
            storageLocation: "Shelf 2",
        },
        {
            id: 3,
            name: "Sample C",
            category: "Sample",
            structure: "",
            description: "Blood sample",
            quantityLeft: 10,
            storageLocation: "Fridge 1",
        },
        {
            id: 4,
            name: "Sample D",
            category: "Sample",
            structure: "",
            description: "Water sample",
            quantityLeft: 5,
            storageLocation: "Fridge 2",
        },
        {
            id: 5,
            name: "Reagent E",
            category: "Reagent",
            structure: "",
            description: "Buffer solution",
            quantityLeft: 20,
            storageLocation: "Shelf 3",
        },
        {
            id: 6,
            name: "Reagent F",
            category: "Reagent",
            structure: "",
            description: "Organic solvent",
            quantityLeft: 40,
            storageLocation: "Shelf 4",
        },
        {
            id: 7,
            name: "Sample G",
            category: "Sample",
            structure: "",
            description: "Soil sample",
            quantityLeft: 15,
            storageLocation: "Fridge 3",
        },
        {
            id: 8,
            name: "Sample H",
            category: "Sample",
            structure: "",
            description: "Plant tissue sample",
            quantityLeft: 7,
            storageLocation: "Fridge 4",
        },
        {
            id: 9,
            name: "Reagent I",
            category: "Reagent",
            structure: "",
            description: "Salt solution",
            quantityLeft: 60,
            storageLocation: "Shelf 5",
        },
        {
            id: 10,
            name: "Reagent J",
            category: "Reagent",
            structure: "",
            description: "Neutral buffer",
            quantityLeft: 25,
            storageLocation: "Shelf 6",
        },
    ];

    const headers: { key: keyof RowData | "action"; label: string }[] = [
        { key: "name", label: "Name" },
        { key: "category", label: "Category" },
        { key: "structure", label: "Structure" },
        { key: "description", label: "Description" },
        { key: "quantityLeft", label: "Quantity Left" },
        { key: "storageLocation", label: "Storage Location" },
        { key: "action", label: "Action" },
    ];

    return (
        <ThemeProvider theme={theme}>
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
            <h1>Reagents Table</h1>
            <TableComponent data={mockData} headers={headers} />
        </ThemeProvider>
    );
}

export default App;
