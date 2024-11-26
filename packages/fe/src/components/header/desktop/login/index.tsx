import { AppBar, Box, Container, Toolbar, useTheme } from "@mui/material";
import { Link } from "@tanstack/react-router";

import { LanguageSelect } from "components/header/LanguageSelectHeader";

import logo from "/lunaHeaderLogo.png";

export function LoginHeaderDesktop() {
    const theme = useTheme();

    return (
        <AppBar elevation={1} sx={{ backgroundColor: theme.palette.background.default }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box display="flex" alignItems="center" flexGrow="1">
                        <Link to="/">
                            <Box
                                component="img"
                                src={logo}
                                alt="Luna LIMS Logo"
                                sx={{ width: 62, height: 80, padding: "13px 0" }}
                            />
                        </Link>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <LanguageSelect />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
