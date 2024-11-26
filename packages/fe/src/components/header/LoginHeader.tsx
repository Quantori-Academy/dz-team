import { useIsDesktop } from "utils/useIsDesktop";

import { LoginHeaderDesktop } from "./desktop/login";
import { LoginHeaderMobile } from "./mobile/login";

export function LoginHeader() {
    const isDesktop = useIsDesktop();
    return isDesktop ? <LoginHeaderDesktop /> : <LoginHeaderMobile />;
}
