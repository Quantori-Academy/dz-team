import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { isProd } from "./utils/isProd";

const base = isProd
    ? "http://vm4.quantori.academy:1337"
    : "http://localhost:1337";

const fetchServerConnection = async () => {
    const response = await fetch(base);
    if (response.ok) {
        return "ok!";
    }
};

const fetchMolCount = async () => {
    const response = await fetch(base + "/molecule/count");
    if (response.ok) {
        return ((await response.json()) as number).toString(); // TODO: types should be defined with schema
    }
};

const fetchMolPost = async () =>
    await fetch(base + "/molecule", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ smiles: "CCO" }),
    });

function App() {
    const [count, setCount] = useState(0);
    const [connectionState, setConnectionState] = useState("...");
    const [molCount, setMolCount] = useState("0");

    useEffect(() => {
        fetchServerConnection().then(setConnectionState).catch(console.error);
        fetchMolCount().then(setMolCount).catch(console.error);
    }, []);

    const handlePost = () => {
        fetchMolPost().then(handleUpdateMolCount).catch(console.error);
    };

    const handleUpdateMolCount = () => {
        fetchMolCount().then(setMolCount).catch(console.error);
    };

    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <h3>{isProd ? "Production build" : "Not production build"}</h3>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>App runs ok!</p>
            </div>
            <p>Server connection is {connectionState}</p>
            <hr />
            <h2>DB</h2>
            <p>registered molecules: {molCount}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <button onClick={handleUpdateMolCount}>
                    update molecules count
                </button>
                <button onClick={handlePost}>
                    register new molecule to DB
                </button>
            </div>
        </>
    );
}

export default App;
