import "./App.css";
import "./logger/debug-load";

import { useEffect, useState } from "react";
import { useGate, useUnit } from "effector-react";

import { fetchMolCount, fetchMolPost, fetchServerConnection } from "api/apiCalls";
import { $isLoading } from "api/loadingState";
import { config } from "config";
import { $materials, AppGate } from "stores";

const logError = (err: unknown) => dev.info("{!offline}", err);

function App() {
    useGate(AppGate);
    const materials = useUnit($materials);
    const isLoading = useUnit($isLoading);
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

    return (
        <>
            <div>{isLoading ? "TEST LOADING..." : null}</div>
            <h1>Vite + React</h1>
            <h3>{config.isProd ? "Production build" : "Not production build"}</h3>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                <p>App runs ok!</p>
                <p>{`${materials?.length ?? 0} materials loaded`}</p>
            </div>
            <p>Server connection is {connectionState}</p>
            <hr />
            <h2>DB</h2>
            <p>registered molecules: {molCount}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <button onClick={handleUpdateMolCount}>update molecules count</button>
                <button onClick={handlePost}>register new molecule to DB</button>
            </div>
        </>
    );
}

export default App;
