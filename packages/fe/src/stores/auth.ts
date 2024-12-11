import { sample } from "effector";
import { jwtDecode } from "jwt-decode";

import { getUser, SelfType } from "api/self";
import { genericDomain } from "logger";

import { loginFx } from "./login";

export type Auth = { token: string; self: SelfType; userId: string };
export type AuthStoreValue = Auth | null | false;

export const $auth = genericDomain.createStore<AuthStoreValue>(false);

export const getUserFx = genericDomain.createEffect(
    ({ token, userId }: { token: string; userId: string }) => {
        try {
            return getUser({ token, userId });
        } catch (err) {
            if (err instanceof Error) {
                dev.error(err.message, err.stack);
            }
            throw new Error("Failed to get user role");
        }
    },
);

const localStorageKey = "effector-session";

export const sessionLoadFx = genericDomain.createEffect(() => {
    const source = localStorage.getItem(localStorageKey);

    if (!source) {
        return null;
    }

    const parsed = JSON.parse(source) as AuthStoreValue;

    if (parsed && parsed.token) {
        const decodedToken: { userId: string } = jwtDecode(parsed.token);
        return { ...parsed, userId: decodedToken.userId };
    }
    return parsed;
});

export const sessionDeleteFx = genericDomain.createEffect(() => {
    localStorage.removeItem(localStorageKey);
});

export const sessionSaveFx = genericDomain.createEffect((auth: AuthStoreValue) => {
    localStorage.setItem(localStorageKey, JSON.stringify(auth));
    return auth;
});

$auth.on(sessionLoadFx.done, (_, { result }) => result);

// save auth when auth value updates
sample({
    clock: $auth.updates,
    source: $auth,
    filter: Boolean,
    fn: (auth) => auth,
    target: sessionSaveFx,
});

// request user based on received token
sample({
    clock: loginFx.done,
    fn: ({ result }) => {
        const decodedToken: { userId: string } = jwtDecode(result.token);
        return { token: result.token, userId: decodedToken.userId };
    },
    target: getUserFx,
});

// set auth value based on received user
sample({
    clock: getUserFx.done,
    fn: ({ params, result }) => ({ token: params.token, userId: params.userId, self: result }),
    target: $auth,
});

// clear auth
sample({
    clock: sessionDeleteFx.done,
    fn: () => null,
    target: $auth,
});
