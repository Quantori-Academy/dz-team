import { useState } from "react";
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
import { Link } from "@tanstack/react-router";
import { useUnit } from "effector-react";

import { $auth } from "stores/auth";
import { rolesHeaders } from "utils/rolesHeaders";

import { DropdownMenuHeaderDesktop } from "./DropdownMenuHeaderDesktop";

import logo from "/lunaHeaderLogo.png";

export function HeaderDesktop() {
    const theme = useTheme();
    const [isArrowUp, setIsArrowUp] = useState(false);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = !!anchorEl;
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setIsArrowUp(!isArrowUp);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const auth = useUnit($auth);
    const role = auth ? rolesHeaders[auth.self.role] : [];

    return (
        <>
            <AppBar elevation={1} sx={{ backgroundColor: theme.palette.background.default }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        {/* logo */}
                        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
                            <Link to="/">
                                <Box
                                    component="img"
                                    src={logo}
                                    alt="Luna LIMS Logo"
                                    sx={{ width: 62, height: 80, padding: "13px 0" }}
                                />
                            </Link>
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
                        <Box
                            onClick={handleClick}
                            display="flex"
                            alignItems="center"
                            sx={{ cursor: "pointer" }}
                        >
                            <Avatar sx={{ mr: 1 }} src="/path/to/avatar.jpg" alt="User Avatar" />

                            <Box display="flex" flexDirection="column">
                                <Box display="flex" gap={"0 16px"}>
                                    <Typography
                                        sx={{
                                            color: theme.palette.text.primary,
                                        }}
                                    >
                                        UserName
                                    </Typography>
                                    {isArrowUp ? (
                                        <>
                                            <KeyboardArrowUpIcon
                                                sx={{
                                                    color: theme.palette.text.disabled,
                                                }}
                                            />

                                            <DropdownMenuHeaderDesktop
                                                handleClose={handleClose}
                                                open={open}
                                                anchorEl={anchorEl}
                                            />
                                        </>
                                    ) : (
                                        <KeyboardArrowDownIcon
                                            sx={{
                                                color: theme.palette.text.disabled,
                                            }}
                                        />
                                    )}
                                </Box>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: theme.palette.text.disabled,
                                        display: "flex",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    {role}
                                </Typography>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}
