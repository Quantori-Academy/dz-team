import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#556cd6",
        },
        secondary: {
            main: "#19857b",
        },
    },
    typography: {
        fontFamily: "Arial, sans-serif",
        h1: {
            fontSize: "2.2rem",
            fontWeight: "bold",
        },
        body1: {
            fontSize: "1rem",
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
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                },
            },
        },
    },
});

export default theme;
