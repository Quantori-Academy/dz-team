import { Logout, Settings } from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/Language";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Divider, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { theme } from "theme";

export function DropdownMenuHeaderDesktop(props: {
    handleClose: () => void;
    open: boolean;
    anchorEl: HTMLElement;
}) {
    return (
        <Menu
            anchorEl={props.anchorEl}
            id="account-menu"
            open={props.open}
            onClose={props.handleClose}
            onClick={props.handleClose}
            slotProps={{
                paper: {
                    elevation: 1,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(112,112,112,0.3))",
                        mt: 4,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                },
            }}
            transformOrigin={{ horizontal: "center", vertical: "top" }}
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        >
            <Box sx={{ mt: 1, mr: 2, mb: 1, ml: 2, width: "148px" }}>
                <Typography
                    sx={{
                        color: theme.palette.text.primary,
                    }}
                >
                    UserName
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: theme.palette.text.disabled,
                    }}
                >
                    usermail@acme.com
                </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={props.handleClose} sx={{ mt: 1 }}>
                <ListItemIcon>
                    <LanguageIcon fontSize="medium" />
                </ListItemIcon>
                Language
            </MenuItem>
            <MenuItem onClick={props.handleClose}>
                <ListItemIcon>
                    <PersonIcon fontSize="medium" />
                </ListItemIcon>
                Account
            </MenuItem>
            <MenuItem onClick={props.handleClose}>
                <ListItemIcon>
                    <Settings fontSize="medium" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={props.handleClose}>
                <ListItemIcon>
                    <Logout fontSize="medium" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );
}
