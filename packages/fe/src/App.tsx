import "./logger/debug-load";

import { ThemeProvider } from "@mui/material";

import theme from "./theme";

function App() {
    return <ThemeProvider theme={theme} />;
}

export default App;
