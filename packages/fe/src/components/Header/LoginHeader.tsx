import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { LoginHeaderDesktop } from "./desktop/login";
import { LoginHeaderMobile } from "./mobile/login";

export function LoginHeader() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));
    if (matches) {
        return <LoginHeaderDesktop />;
    } else {
        return <LoginHeaderMobile />;
    }
}
