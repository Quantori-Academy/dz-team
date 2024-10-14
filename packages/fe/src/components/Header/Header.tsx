import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { HeaderDesktop } from "./desktop";
import { HeaderMobile } from "./mobile";

export function Header() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));
    if (matches) {
        return <HeaderDesktop />;
    } else {
        return <HeaderMobile />;
    }
}
