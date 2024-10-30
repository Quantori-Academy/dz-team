import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "@tanstack/react-router";
import { useUnit } from "effector-react";
import { theme } from "theme";

import { UserRole } from "api/self";
import { $auth } from "stores/auth";

type INavigationList = Array<{
    href: string;
    title: string;
    details: string;
}>;

type RoleToNavList = {
    [key in UserRole]: INavigationList;
};

const rolesNavLists: RoleToNavList = {
    admin: [
        { href: "/admin", title: "Home", details: "Entry point of application" },
        { href: "/users", title: "User list", details: "See the list of users" },
        { href: "/newUser", title: "New user", details: "Create a new user" },
    ],
    procurementOfficer: [
        {
            href: "/pOfficer",
            title: "Home",
            details: "Entry point of application",
        },
        {
            href: "/orders",
            title: "Orders",
            details: "Create a new request, view request statuses",
        },
    ],
    researcher: [
        { href: "/", title: "Home", details: "Entry point of application" },
        {
            href: "/reagents",
            title: "Reagents",
            details: "See the list of available reagents and reagent details",
        },
        {
            href: "/samples",
            title: "Samples",
            details: "Explore existing samples or create new ones",
        },
        {
            href: "/dev",
            title: "Dev",
            details: "Dev route",
        },
        {
            href: "/storage",
            title: "Storage",
            details: "View Storage locations list",
        },
    ],
};

interface Props {
    onClickCloseMobileModal?: () => void;
}

export function NavList({ onClickCloseMobileModal }: Props) {
    const pathname = useLocation().pathname;

    const auth = useUnit($auth);

    const routes = auth ? rolesNavLists[auth.self.role] : [];

    return (
        <>
            {routes.map((route, idx) => (
                <Link
                    key={idx}
                    to={route.href}
                    style={{ width: "100%", textDecoration: "none", color: "inherit" }}
                    onClick={onClickCloseMobileModal}
                >
                    <Box
                        sx={{
                            border: "2px solid",
                            borderColor: theme.palette.primary.main,
                            borderRadius: "4px",
                            p: "8px",
                            bgcolor:
                                pathname === route.href
                                    ? theme.palette.primary.main
                                    : "transparent",
                            color:
                                pathname === route.href
                                    ? theme.palette.background.default
                                    : theme.palette.text.primary,
                        }}
                    >
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                            {route.title}
                        </Typography>
                        <Typography variant="subtitle2">{route.details}</Typography>
                    </Box>
                </Link>
            ))}
        </>
    );
}
