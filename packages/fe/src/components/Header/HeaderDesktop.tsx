import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Notifications from "@mui/icons-material/Notifications";
import {
    AppBar,
    Avatar,
    Box,
    Container,
    IconButton,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";

import logo from "/lunaHeaderLogo.png";

export function HeaderDesktop() {
    const theme = useTheme();
    const [isArrowUp, setIsArrowUp] = useState(false);
    const handleArrowClick = () => {
        setIsArrowUp(!isArrowUp);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: theme.palette.background.default }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    {/* logo */}
                    <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
                        <Box
                            component="img"
                            src={logo}
                            alt="Luna LIMS Logo"
                            sx={{ width: 62, height: 54, padding: "13px 0" }}
                        />
                    </Box>

                    {/* notification icon */}
                    <IconButton
                        sx={{
                            mr: 5,
                            color: theme.palette.text.disabled,
                            "&:focus": { outline: "none" },
                        }}
                        disableRipple
                    >
                        <Notifications sx={{ width: 32, height: 32 }} />
                    </IconButton>

                    {/* profile */}
                    <Box display="flex" alignItems="center">
                        <Avatar
                            sx={{ width: 40, height: 40, mr: 1 }}
                            src="/path/to/avatar.jpg"
                            alt="User Avatar"
                        />

                        <Box display="flex" flexDirection="column">
                            <Box display="flex">
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: "regular",
                                        color: theme.palette.text.primary,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    UserName
                                </Typography>
                                <IconButton
                                    onClick={handleArrowClick}
                                    sx={{
                                        color: theme.palette.text.disabled,
                                        ml: 1,
                                        mt: -1,
                                        mb: -1,
                                        mr: -1,
                                        "&:focus": { outline: "none" },
                                    }}
                                    disableRipple
                                >
                                    {isArrowUp ? (
                                        <KeyboardArrowUpIcon />
                                    ) : (
                                        <KeyboardArrowDownIcon />
                                    )}
                                </IconButton>
                            </Box>

                            <Typography
                                variant="body2"
                                sx={{
                                    color: theme.palette.text.disabled,
                                    display: "flex",
                                    justifyContent: "flex-start",
                                }}
                            >
                                Admin
                            </Typography>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
