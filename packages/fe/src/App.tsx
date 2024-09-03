import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { isProd } from "./utils/isProd";

function App() {
    const [count, setCount] = useState(0);
    const [connectionState, setConnectionState] = useState("...");

    useEffect(() => {
        fetch(
            isProd
                ? "http://vm4.quantori.academy:1337/"
                : "http://localhost:1337/",
        )
            .then((res) => {
                if (res.ok) {
                    setConnectionState("ok!");
                }
            })
            .catch((err) => {
                setConnectionState("offline, check console for details");
                console.error(err);
            });
    }, []);

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
        </>
    );
}

export default App;
