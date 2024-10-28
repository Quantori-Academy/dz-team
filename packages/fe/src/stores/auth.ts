import { sample } from "effector";

import { getUser, SelfType } from "api/self";
import { genericDomain } from "logger";

import { loginFx } from "./login";

export type Auth = { token: string; self: SelfType };
export type AuthStoreValue = Auth | null | false;

export const $auth = genericDomain.createStore<AuthStoreValue>(false);

export const getUserFx = genericDomain.createEffect(async (token: string) => {
    try {
        const response = await getUser(token);

        if (response) {
            return response;
        }
    } catch (err) {
        if (err instanceof Error) {
            dev.error(err.message, err.stack);
        }
        throw new Error("Failed to get user role");
    }
});

const localStorageKey = "effector-session";

export const sessionLoadFx = genericDomain.createEffect(() => {
    const source = localStorage.getItem(localStorageKey);

    if (!source) {
        return null;
    }
    return JSON.parse(source) as AuthStoreValue;
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
    fn: ({ result }) => result.token,
    target: getUserFx,
});

// set auth value based on received user
sample({
    clock: getUserFx.done,
    fn: ({ params: token, result }) => ({ token: token, self: result! }),
    target: $auth,
});

// clear auth
sample({
    clock: sessionDeleteFx.done,
    fn: () => null,
    target: $auth,
});
