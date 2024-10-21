import { genericDomain } from "logger";

export const loginFx = genericDomain.createEffect(
    ({ username, password }: { username: string; password: string }) => {
        // the request function doesn't support logic, so we use a mock here
        if (username === "admin" && password === "password") {
            return { success: true };
        } else {
            throw new Error("Failed to log in: incorrect username or password");
        }
    },
);

export const $loginState = genericDomain
    .createStore<{ success: boolean; message: string | null }>({ success: false, message: null })
    .on(loginFx.done, () => ({ success: true, message: null }))
    .on(loginFx.fail, (_, { error }) => ({ success: false, message: error.message }));
