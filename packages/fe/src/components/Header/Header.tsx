import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { HeaderDesktop } from "./HeaderDesktop";
import { HeaderMobile } from "./HeaderMobile";

export function Header() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));
    if (matches) {
        return <HeaderDesktop />;
    } else {
        return <HeaderMobile />;
    }
}
