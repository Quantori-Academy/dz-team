import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { LoginHeaderDesktop } from "./LoginHeaderDesktop";
import { LoginHeaderMobile } from "./LoginHeaderMobile";

export function LoginHeader() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));
    if (matches) {
        return <LoginHeaderDesktop />;
    } else {
        return <LoginHeaderMobile />;
    }
}
