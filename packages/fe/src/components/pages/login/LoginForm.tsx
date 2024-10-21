import { ChangeEvent, useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Link,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { useUnit } from "effector-react";

import { $loginState, loginFx } from "stores/login";
import { useIsDesktop } from "utils/useIsDesktop";

export function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const loginState = useUnit($loginState);
    const isDesktop = useIsDesktop();

    useEffect(() => {
        if (loginState.success) {
            navigate({ to: "/" });
        }
    }, [loginState.success, navigate]);

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
                    error={!!usernameError || !!loginState.message}
                    label={usernameError || "Username"}
                    variant="outlined"
                    sx={{ height: "56px", width: "100%", mt: 3, mb: 2 }}
                    value={username}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setUsername(event.target.value);
                    }}
                />
                <TextField
                    error={!!passwordError || !!loginState.message}
                    label={passwordError || "Password"}
                    variant="outlined"
                    type="password"
                    sx={{ height: "56px", width: "100%", mb: 2 }}
                    value={password}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setPassword(event.target.value);
                    }}
                />
                <FormControlLabel
                    control={<Checkbox sx={{ ml: 1 }} />}
                    label="Remember me"
                    sx={{ mb: 2 }}
                />
                <Button
                    onClick={() => {
                        if (!username) {
                            setUsernameError("Username is required");
                        }
                        if (!password) {
                            setPasswordError("Password is required");
                        }
                        if (username && password) {
                            loginFx({ username, password });
                            setPasswordError("");
                            setUsernameError("");
                        }
                    }}
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
                {loginState.message ? (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        Failed to log in: incorrect username or password
                    </Alert>
                ) : null}
                <Link variant="body2" color="secondary" sx={{ cursor: "pointer" }}>
                    Forgot password?
                </Link>
            </Box>
        </Box>
    );
}
