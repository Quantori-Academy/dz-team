import { UserRole } from "api/self";
import { useUnit } from "effector-react";
import { $auth } from "stores/auth";

export const useSession = () => {
    const auth = useUnit($auth);
    const session = auth ? auth.self.role : null;

    const isAdmin = session === UserRole.admin;
    const isProcurementOfficer = session === UserRole.procurementOfficer;
    const isResearcher = session === UserRole.researcher;

    return { session, isAdmin, isProcurementOfficer, isResearcher };
};
