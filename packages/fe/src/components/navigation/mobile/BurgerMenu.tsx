import MenuIcon from "@mui/icons-material/Menu";
import { Box, Drawer, IconButton } from "@mui/material";
import { theme } from "theme";

import { NavList } from "../NavList";

import logo from "/lunaHeaderLogo.png";

interface Props {
    open: boolean;
    setOpen: (val: boolean) => void;
}

export default function BurgerMenu({ open, setOpen }: Props) {
    return (
        <Drawer open={open} onClose={() => setOpen(false)}>
            <Box
                sx={{
                    p: "32px",
                    pt: "12px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "24px",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <IconButton
                        sx={{
                            color: theme.palette.text.disabled,
                            "&:focus": { outline: "none" },
                        }}
                        onClick={() => setOpen(false)}
                    >
                        <MenuIcon sx={{ width: 36, height: 36, transform: "rotate(90deg)" }} />
                    </IconButton>
                    <Box
                        component="img"
                        src={logo}
                        alt="Luna LIMS Logo"
                        sx={{ width: 62, height: 56 }}
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <NavList onClickCloseMobileModal={() => setOpen(false)} />
                </Box>
            </Box>
        </Drawer>
    );
}
