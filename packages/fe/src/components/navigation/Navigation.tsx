import { Box, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { theme } from "theme";

const routes = [
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

export function Navigation() {
    return (
        <Box
            sx={{
                width: "fit-content",
                maxWidth: "270px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                gap: "8px",
            }}
        >
            {routes.map((route, idx) => (
                <Link
                    key={idx}
                    to={route.href}
                    style={{ width: "100%", textDecoration: "none", color: "inherit" }}
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
                        <Typography variant="subtitle2" sx={{}}>
                            {route.details}
                        </Typography>
                    </Box>
                </Link>
            ))}
        </Box>
    );
}
