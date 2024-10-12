import MenuIcon from "@mui/icons-material/Menu";
import Notifications from "@mui/icons-material/Notifications";
import { AppBar, Avatar, Box, Container, IconButton, Toolbar, useTheme } from "@mui/material";

export function HeaderMobile() {
    const theme = useTheme();

    return (
        <AppBar
            position="static"
            elevation={1}
            sx={{ backgroundColor: theme.palette.background.default }}
        >
            <Container maxWidth="sm">
                <Toolbar disableGutters>
                    {/* menu icon */}
                    <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
                        <IconButton
                            sx={{
                                color: theme.palette.text.disabled,
                                "&:focus": { outline: "none" },
                            }}
                            disableRipple
                        >
                            <MenuIcon sx={{ width: 36, height: 36 }} />
                        </IconButton>
                    </Box>

                    {/* notification icon */}
                    <IconButton
                        sx={{
                            mr: 4,
                            color: theme.palette.text.disabled,
                            "&:focus": { outline: "none" },
                        }}
                        disableRipple
                    >
                        <Notifications sx={{ width: 32, height: 32 }} />
                    </IconButton>

                    {/* profile */}
                    <Avatar
                        sx={{ width: 32, height: 32 }}
                        src="/path/to/avatar.jpg"
                        alt="User Avatar"
                    />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
