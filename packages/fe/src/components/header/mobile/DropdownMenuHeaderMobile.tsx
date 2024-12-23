import { Logout } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, MenuItem, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Link } from "@tanstack/react-router";
import { useUnit } from "effector-react";
import { theme } from "theme";

import { sessionDeleteFx } from "stores/auth";

type Props = {
    open: boolean;
    setOpen: (newOpen: boolean) => void;
};

export function DropdownMenuHeaderMobile({ open, setOpen }: Props) {
    const deleteSession = useUnit(sessionDeleteFx);
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
                <Link onClick={deleteSession} style={{ textDecoration: "none" }}>
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
