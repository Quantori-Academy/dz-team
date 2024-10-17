import { Logout, Settings } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton, MenuItem, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Link } from "@tanstack/react-router";
import { theme } from "theme";

type Props = {
    open: boolean;
    setOpen: (newOpen: boolean) => void;
};

export function DropdownMenuHeaderMobile({ open, setOpen }: Props) {
    return (
        <Drawer anchor={"top"} open={open} onClose={() => setOpen(false)}>
            <Box role="presentation" onClick={() => setOpen(false)}>
                <Box display="flex" sx={{ mt: 1, mr: 2, mb: 1, ml: 2 }}>
                    <Box>
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
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: 2,
                            right: 2,
                            zIndex: 10,
                        }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
                <Divider />

                <MenuItem
                    sx={{
                        color: theme.palette.text.primary,
                        mt: 1,
                    }}
                >
                    <ListItemIcon>
                        <PersonIcon fontSize="medium" />
                    </ListItemIcon>
                    Account
                </MenuItem>
                <MenuItem
                    sx={{
                        color: theme.palette.text.primary,
                    }}
                >
                    <ListItemIcon>
                        <Settings fontSize="medium" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <Divider />
                <Link to="/login" style={{ textDecoration: "none" }}>
                    <MenuItem
                        sx={{
                            color: theme.palette.text.primary,
                        }}
                    >
                        <ListItemIcon>
                            <Logout fontSize="medium" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Link>
            </Box>
        </Drawer>
    );
}
