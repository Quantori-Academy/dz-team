import LanguageIcon from "@mui/icons-material/Language";
import { AppBar, Box, Container, IconButton, Toolbar, useTheme } from "@mui/material";
import { Link } from "@tanstack/react-router";

import logo from "/lunaHeaderLogo.png";

export function LoginHeaderMobile() {
    const theme = useTheme();

    return (
        <AppBar elevation={1} sx={{ backgroundColor: theme.palette.background.default }}>
            <Container maxWidth="sm">
                <Toolbar disableGutters>
                    {/* logo */}
                    <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
                        <Link to="/">
                            <Box
                                component="img"
                                src={logo}
                                alt="Luna LIMS Logo"
                                sx={{ width: 52, height: 46, mt: 1, mb: 1 }}
                            />
                        </Link>
                    </Box>

                    {/* language icon */}
                    <IconButton
                        sx={{
                            color: theme.palette.text.disabled,
                            "&:focus": { outline: "none" },
                        }}
                        disableRipple
                    >
                        <LanguageIcon
                            sx={{ width: 32, height: 32, mt: -1, mr: -1, mb: -1, ml: -1 }}
                        />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
