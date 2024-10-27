import { useCallback, useEffect, useRef, useState } from "react";
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
import { roleRoutes } from "rolesRoutes";

import { $loginState, loginFx } from "stores/login";
import { $selfState } from "stores/self";
import { useIsDesktop } from "utils/useIsDesktop";

export function LoginForm() {
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const loginState = useUnit($loginState);
    const selfState = useUnit($selfState);
    const isDesktop = useIsDesktop();

    useEffect(() => {
        if (selfState) {
            const value = {
                to: roleRoutes[selfState.role],
            };

            navigate(value);
        }
    }, [selfState, navigate]);

    const handleLogin = useCallback(() => {
        const username = usernameInput.current?.value;
        const password = passwordInput.current?.value;

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
    }, [passwordInput, usernameInput]);

    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
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
                    height: "100%",
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
                    mt: 15,
                }}
            >
                <Typography sx={{ fontSize: 24 }}>Log In</Typography>
                <TextField
                    variant="outlined"
                    sx={{ minHeight: 56, width: 1, mt: 3, mb: 2 }}
                    inputRef={usernameInput}
                    error={!!usernameError || !!loginState.errorMessage}
                    label={usernameError || "Username"}
                />
                <TextField
                    variant="outlined"
                    type="password"
                    sx={{ minHeight: 56, width: 1, mb: 2 }}
                    inputRef={passwordInput}
                    error={!!passwordError || !!loginState.errorMessage}
                    label={passwordError || "Password"}
                />
                {/* TODO: use when auth state is added */}
                <FormControlLabel
                    label="Remember me"
                    sx={{ mb: 2 }}
                    control={<Checkbox sx={{ ml: 1 }} />}
                />
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        minHeight: 42,
                        width: 1,
                        mb: 2,
                    }}
                    onClick={handleLogin}
                >
                    Log In
                </Button>
                <Box sx={{ minHeight: 90, mb: 2 }}>
                    {loginState.errorMessage ? (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {loginState.errorMessage}
                        </Alert>
                    ) : null}
                </Box>
                {/* TODO: update link when password restoration page is ready */}
                <Link variant="body2" color="secondary" sx={{ cursor: "pointer" }}>
                    Forgot password?
                </Link>
            </Box>
        </Box>
    );
}
