import { AppBar, Box, Container, Toolbar, useTheme } from "@mui/material";

import { LanguageSelect } from "./LanguageSelectHeader";

import logo from "/lunaHeaderLogo.png";

export function LoginHeaderDesktop() {
    const theme = useTheme();

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{ backgroundColor: theme.palette.background.default }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box display="flex" alignItems="center" flexGrow="1">
                        <Box
                            component="img"
                            src={logo}
                            alt="Luna LIMS Logo"
                            sx={{ width: 62, height: 80, padding: "13px 0" }}
                        />
                    </Box>

                    <Box display="flex" alignItems="center">
                        <LanguageSelect />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
