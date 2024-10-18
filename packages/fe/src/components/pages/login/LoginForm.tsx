import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

import { useIsDesktop } from "utils/useIsDesktop";

export function LoginForm() {
    const isDesktop = useIsDesktop();
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundImage: { xs: "none", sm: 'url("/bg.png")' },
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                "::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: { xs: "none", sm: "rgba(83, 83, 83, 0.4)" },
                    zIndex: 1,
                },
            }}
        >
            <Box
                component={Paper}
                elevation={isDesktop ? 1 : 0}
                sx={{
                    width: 400,
                    borderRadius: 1,
                    zIndex: 2,
                    p: 7,
                }}
            >
                <Typography sx={{ fontSize: "24px" }}>Log In</Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    sx={{ height: "56px", width: "100%", mt: 3, mb: 2 }}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    sx={{ height: "56px", width: "100%", mb: 2 }}
                />
                <FormControlLabel
                    control={<Checkbox sx={{ ml: 1 }} />}
                    label="Remember me"
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        height: "42px",
                        width: "100%",
                        mb: 2,
                    }}
                >
                    Log In
                </Button>
                <Link variant="body2" color="secondary" sx={{ cursor: "pointer" }}>
                    Forgot password?
                </Link>
            </Box>
        </Box>
    );
}
