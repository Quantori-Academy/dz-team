import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {},
    typography: {
        fontFamily: "Arial, sans-serif",
        h1: {
            fontSize: "3.2rem",
            fontWeight: "bold",
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});

export default theme;
