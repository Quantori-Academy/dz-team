import { useIsDesktop } from "utils/useIsDesktop";

import { DesktopNav } from "./desktop/DesktopNav";

export function Navigation() {
    const isDesktop = useIsDesktop();
    return isDesktop && <DesktopNav />;
}
