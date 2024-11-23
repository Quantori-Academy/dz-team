import { sample } from "effector";
import { jwtDecode } from "jwt-decode";

import { getUser, SelfType } from "api/self";
import { getCurrentUser } from "api/users/getCurrentUser";
import { genericDomain } from "logger";
import { PublicUserType } from "shared/zodSchemas/user/publicUserSchema";

import { loginFx } from "./login";

export type Auth = { token: string; self: SelfType };
export type Me = PublicUserType;
export type AuthStoreValue = Auth | null | false;
export type MeStoreValue = Me | null;

export const $auth = genericDomain.createStore<AuthStoreValue>(false);
export const $me = genericDomain.createStore<MeStoreValue>(null);

export const getCurrentUserFx = genericDomain.createEffect(async () => {
    const response = await getCurrentUser();
    return response;
});

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
$me.on(getCurrentUserFx.doneData, (_, response) => response);

// save auth when auth value updates
sample({
    clock: $auth.updates,
    source: $auth,
    filter: Boolean,
    fn: (auth) => auth,
    target: sessionSaveFx,
});
sample({
    clock: sessionLoadFx.doneData,
    target: getCurrentUserFx,
});
// request user based on received token
sample({
    clock: loginFx.done,
    fn: ({ result }) => {
        const decodedToken: { userId: string } = jwtDecode(result.token);
        const res = { token: result.token, userId: decodedToken.userId };
        return res;
    },
    target: getUserFx,
});

// set auth value based on received user
sample({
    clock: getUserFx.done,
    fn: ({ params, result }) => ({ token: params.token, self: result }),
    target: $auth,
});

// clear auth
sample({
    clock: sessionDeleteFx.done,
    fn: () => null,
    target: $auth,
});
sample({
    clock: getCurrentUserFx.doneData,
    fn: (response) => response,
    target: $me,
});
