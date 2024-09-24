import "./App.css";
import "./logger/debug-load";

import { ThemeProvider } from "@mui/material/styles";

import theme from "./Theme";

function App() {
    return <ThemeProvider theme={theme} />;
}

export default App;
