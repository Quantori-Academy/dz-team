import { useIsDesktop } from "utils/useIsDesktop";

import { HeaderDesktop } from "./desktop";
import { HeaderMobile } from "./mobile";

export function Header() {
    const isDesktop = useIsDesktop();
    return isDesktop ? <HeaderDesktop /> : <HeaderMobile />;
}
