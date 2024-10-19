import { Box, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { theme } from "theme";

type INavigationList = Array<{
    href: string;
    title: string;
    details: string;
}>;

const routes: INavigationList = [
    {
        href: "/",
        title: "Home",
        details: "Entry point of application",
    },
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
        href: "/orders",
        title: "Orders",
        details: "Create a new request, view request statuses",
    },
    {
        href: "/dev",
        title: "Dev",
        details: "Dev route",
    },
];

interface Props {
    onClickCloseMobileModal?: () => void;
}

export function NavList({ onClickCloseMobileModal }: Props) {
    return (
        <>
            {routes.map((route, idx) => (
                <Link
                    key={idx}
                    to={route.href}
                    style={{ width: "100%", textDecoration: "none", color: "inherit" }}
                    onClick={() => onClickCloseMobileModal && onClickCloseMobileModal()}
                >
                    <Box
                        sx={{
                            border: "2px solid",
                            borderColor: theme.palette.primary.main,
                            borderRadius: "4px",
                            p: "8px",
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
