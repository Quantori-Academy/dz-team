import { Logout, Settings } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import LanguageIcon from "@mui/icons-material/Language";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton, MenuItem, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import ListItemIcon from "@mui/material/ListItemIcon";
import { theme } from "theme";

export function DropdownMenuHeaderMobile(props: {
    open: boolean;
    toggleDrawer: (newOpen: boolean) => () => void;
}) {
    const DrawerList = (
        <Box sx={{ width: "100vw" }} role="presentation" onClick={props.toggleDrawer(false)}>
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
            <MenuItem sx={{ mt: 1 }}>
                <ListItemIcon>
                    <LanguageIcon fontSize="medium" />
                </ListItemIcon>
                Language
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <PersonIcon fontSize="medium" />
                </ListItemIcon>
                Account
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <Settings fontSize="medium" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <Divider />
            <MenuItem>
                <ListItemIcon>
                    <Logout fontSize="medium" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Box>
    );

    return (
        <>
            <Drawer anchor={"top"} open={props.open} onClose={props.toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    );
}
